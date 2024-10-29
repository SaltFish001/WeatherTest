import React from 'react';
import { Button } from 'antd';
import { Layout } from 'antd';
import style from './index.module.css';
const { Sider, Content } = Layout;
const Search: React.FC = () => {
  return (
    <Layout
      style={{
        width: '100%',
        height: '100%',
      }}
      hasSider
    >
      <Sider>
        <div className="logo-vertical" />
      </Sider>
      <Content></Content>
    </Layout>
  );
};
export default Search;
