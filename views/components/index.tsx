import React, { useEffect, useState } from 'react';
// import { Button } from 'antd';
import { Input, Layout, Menu, message, Spin } from 'antd';
import './index.css';
import type {
  lookup_responst,
  city_search_result,
  weather_response,
} from '../../backend/router_inject';
import Desc from './desc';
const { Sider, Content } = Layout;
const Search: React.FC = () => {
  const [message_api, context_holder] = message.useMessage();
  const [input_city, set_input_city] = useState('');
  const [search_loading, set_search_loading] = useState(false);
  const [city_data, set_city_data] = useState<city_search_result[]>([]);
  const [select_city, set_select_city] = useState<
    city_search_result | undefined
  >();
  const [city_weather, set_city_weather] = useState<
    weather_response | undefined
  >();
  const on_search = async () => {
    set_search_loading(true);
    try {
      const res = await fetch('/api/ctiy_search?city=' + input_city, {
        method: 'GET',
      });
      if (res.status !== 200) {
        message_api.error('查询出错了：' + (await res.text()));
        return;
      }
      const json_data = (await res.json()) as lookup_responst;
      set_city_data(json_data.location);
    } catch (error) {
      message_api.error('查询出错了：' + (error as Error).message);
    } finally {
      set_search_loading(false);
    }
  };
  useEffect(() => {
    set_select_city(undefined);
  }, [city_data]);
  useEffect(() => {
    set_city_weather(undefined);
    if (select_city) {
      fetch(`/api/ctiy_weather/${select_city.id}`, {
        method: 'GET',
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('请求出错');
          }
          return res.json();
        })
        .then((json) => {
          set_city_weather(json as weather_response);
        })
        .catch((error) => {
          message_api.error('查询出错了：' + (error as Error).message);
        })
        .finally(() => {});
    }
  }, [select_city]);

  return (
    <Layout
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}
      hasSider
    >
      {context_holder}
      <Sider>
        <div className="logo-vertical">Simple Weather</div>
        <Input.Search
          className="input-city"
          value={input_city}
          loading={search_loading}
          placeholder="请输入城市名"
          onChange={(e) => set_input_city(e.target.value)}
          onSearch={on_search}
        />
        <Menu
          theme="dark"
          items={city_data.map((city) => ({
            key: city.id,
            label: city.name,
            onClick: () => {
              set_select_city(city);
            },
          }))}
        />
      </Sider>
      <Content>
        {select_city && city_weather ? (
          <Desc
            {...city_weather}
            name={select_city.name}
            adm1={select_city.adm1}
            adm2={select_city.adm2}
            country={select_city.country}
          />
        ) : select_city && !city_weather ? (
          <Spin
            size="large"
            style={{
              width: '100%',
              marginTop: '20px',
            }}
            spinning
          />
        ) : (
          <></>
        )}
      </Content>
    </Layout>
  );
};
export default Search;
