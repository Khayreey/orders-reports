import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

const TableTabs = ()=>{
return (
  <Segmented
  options={[
    {
      label: 'كل الطلبات',
      value: 'List',
      icon: <BarsOutlined />,
    },
    {
      label: 'طلبات الشحن',
      value: 'Kanban',
      icon: <AppstoreOutlined />,
    },
  ]}
/>
)
}

export default TableTabs