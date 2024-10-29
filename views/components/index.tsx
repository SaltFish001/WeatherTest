import React, { useState } from 'react';
// import { Button } from 'antd';
import { Input, Layout } from 'antd';
import './index.css';
const { Sider, Content } = Layout;
const Search: React.FC = () => {
  const [input_city, set_input_city] = useState('');

  return (
    <Layout
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}
      hasSider
    >
      <Sider>
        <div className="logo-vertical">Simple Weather</div>
        <Input
          className="input-city"
          value={input_city}
          placeholder="请输入城市名"
          onChange={(e) => set_input_city(e.target.value)}
        />
      </Sider>
      <Content></Content>
    </Layout>
  );
};
export default Search;
