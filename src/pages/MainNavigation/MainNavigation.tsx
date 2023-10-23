/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { Layout, Menu, Button } from "antd";
import styles from "./main.module.scss";
const { Header, Sider, Content } = Layout;
import { LuSettings, LuLayoutDashboard } from "react-icons/lu";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { TbTruckDelivery } from "react-icons/tb";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { LiaWarehouseSolid } from "react-icons/lia";
import { Link, Outlet, useLocation } from "react-router-dom";




const MainNavigation: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
    const [current, setCurrent] = useState(location.pathname);
    //or simply use const [current, setCurrent] = useState(location.pathname)        

    useEffect(() => {
        if (location) {
            if( current !== location.pathname ) {
                setCurrent(location.pathname);
            }
        }
    }, [location, current]);

    function handleClick(e: any) {
        setCurrent(e.key);
    }


  
  return (
    <Layout style={{ direction: "rtl", minHeight: "100dvh" }}>
      <Sider
        className={styles.sider}
        trigger={null}
        collapsedWidth={70}
        collapsible
        collapsed={collapsed}
      >
        <Menu
          className={styles.menu}
          mode="inline"
          onClick={handleClick}
          
          selectedKeys={[current]}
        
          
          items=
          {
            [
            {
              key: "/",
              icon: <LuLayoutDashboard />,
              label: <Link to="/">الرئيسية</Link>,
            },
            {
              key: "/orders",
              icon: <TfiShoppingCartFull />,
              label: <Link to="/orders">الطلبات</Link>,
            },
            {
              key: "/bills",
              icon: <TfiShoppingCartFull />,
              label: <Link to="/bills">البوالص</Link>,
            },
            {
              key: "/products",
              icon: <TbTruckDelivery />,
              label: <Link to="/products">المنتجات</Link>,
            },
            {
              key: "/warehouse",
              icon: <LiaWarehouseSolid />,
              label:  <Link to="/warehouse">المخزن</Link>,
            },
            {
              key: "/ship",
              icon: <LiaWarehouseSolid />,
              label:  <Link to="/ship">الشحن</Link>,
            },
            {
              key: "/setting",
              icon: <LuSettings />,
              label: <Link to="/setting">الإعدادات</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          {/* <img
            style={{ alignSelf: "end", marginInlineEnd: "20px", width: "15%" }}
            src="/logo.png"
          /> */}
        </Header>
        <Content
          style={{
            margin: "0px 16px",
            marginTop: "3rem",
            padding: 24,
            minHeight: 280,
            height: "100%",
          }}
        >
          <div
            style={{
              marginInlineStart: collapsed ? "5rem" : "12rem",
              transition: "all 0.3s,background 0s",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainNavigation;
