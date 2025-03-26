
import { Layout } from "antd";
import "./LayoutDefault.css";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import MenuList from "../MenuList/MenuList";

const { Content, Footer, Sider } = Layout;

export default function LayoutDefault() {
    return (
        <>
            <Layout className="layout">
                <header className="header">
                    <Header />
                </header >
                <Layout className="sublayout">
                    <Sider width="15vw" className="sider">
                        <MenuList />
                    </Sider>

                    <Content className="content">
                        <Outlet />
                    </Content>

                </Layout>
            </Layout>
        </>
    );
}