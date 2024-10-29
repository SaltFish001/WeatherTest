import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import type { weather_response } from '../../../backend/router_inject';
import dayjs from 'dayjs';

const DESC: React.FC<
  weather_response & {
    name: string;
    adm2: string;
    adm1: string;
    country: string;
  }
> = (params) => {
  const { now, fxLink } = params;
  const items: DescriptionsProps['items'] = [
    {
      key: 'obsTime',
      label: '更新时间',
      children: dayjs(now.obsTime).format('YYYY年MM月DD日 HH时mm分ss秒'),
    },
    {
      key: 'temp',
      label: '当前温度',
      children: now.temp + '°C',
    },
    {
      key: 'feelsLike',
      label: '体感温度',
      children: now.feelsLike + '°C',
    },
    {
      key: 'text',
      label: '描述',
      children: now.text,
    },
    {
      key: 'windDir',
      label: '风向',
      children: now.windDir,
    },
    {
      key: 'windScale',
      label: '风力等级',
      children: now.windScale,
    },
    {
      key: 'windSpeed',
      label: '风速',
      children: now.windSpeed + ' km/h',
    },
    {
      key: 'humidity',
      label: '相对湿度',
      children: now.humidity + '%',
    },
    {
      key: 'precip',
      label: '过去1小时降水量',
      children: now.precip + ' mm',
    },
    {
      key: 'pressure',
      label: '大气压强',
      children: now.pressure + ' hPa',
    },
    {
      key: 'vis',
      label: '能见度',
      children: now.vis + '公里',
    },
    {
      key: 'fxLink',
      label: '详情',
      children: (
        <a href={fxLink} target="_blank">
          查看
        </a>
      ),
    },
  ];
  return (
    <Descriptions
      style={{ width: '100%', height: '100%' }}
      title={`${params.country}-${params.adm1}-${params.adm2}-${params.name} 实况天气`}
      bordered
      items={items}
    />
  );
};
export default DESC;
