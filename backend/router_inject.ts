import { type IRouter } from '0http-bun/common';
const BASE_PATTERN = '/api';
const API_TOKEN = '7aad150dee5948f6bf505cb6ecdd5a00';

export type lookup_responst = {
  code: 200 | number;
  location: city_search_result[];
};
export type city_search_result = {
  name: string;
  id: string;
  lat: string;
  lon: string;
  adm2: string;
  adm1: string;
  country: string;
  tz: string;
  utcOffset: string;
  isDst: string;
  type: string;
  rank: string;
  fxLink: string;
};

export type weather_response = {
  code: string;
  updateTime: string;
  fxLink: string;
  now: {
    obsTime: string; // 数据观测时间
    temp: string; // 温度，默认单位：摄氏度
    feelsLike: string; // 体感温度，默认单位：摄氏度
    icon: string; // 天气状况的图标代码，另请参考天气图标项目
    text: string; // 天气状况的文字描述，包括阴晴雨雪等天气状态的描述
    wind360: string; // 风向360角度
    windDir: string; // 风向
    windScale: string; // 风力等级
    windSpeed: string; // 风速，公里/小时
    humidity: string; // 相对湿度，百分比数值
    precip: string; // 过去1小时降水量，默认单位：毫米
    pressure: string; // 大气压强，默认单位：百帕
    vis: string; // 能见度，默认单位：公里
  };
};

export default (router: IRouter) => {
  const qweather_search_url = new URL(
    'https://geoapi.qweather.com/v2/city/lookup',
  );
  qweather_search_url.searchParams.set('key', API_TOKEN);
  qweather_search_url.searchParams.set('lang', 'zh');

  router.get(BASE_PATTERN + '/ctiy_search', async (req) => {
    const { city } = req.query as {
      city?: string;
    };
    if (!city) {
      return new Response('输入城市名！', { status: 400 });
    }
    qweather_search_url.searchParams.set('location', city);
    const res = await fetch(qweather_search_url.toString(), {
      method: 'GET',
    });
    if (res.status !== 200) {
      new Response('请求出错', { status: res.status });
    }
    return Response.json(await res.json());
  });
  const qweather_weather_url = new URL(
    'https://devapi.qweather.com/v7/weather/now',
  );
  qweather_weather_url.searchParams.set('key', API_TOKEN);
  qweather_weather_url.searchParams.set('lang', 'zh');

  router.get(BASE_PATTERN + '/ctiy_weather/:id', async (req) => {
    const { id } = req.params;
    if (!id) {
      return new Response('输入城市名ID！', { status: 400 });
    }
    qweather_weather_url.searchParams.set('location', id);
    const res = await fetch(qweather_weather_url.toString(), {
      method: 'GET',
    });
    if (res.status !== 200) {
      new Response('请求出错', { status: res.status });
    }
    return Response.json(await res.json());
  });
};
