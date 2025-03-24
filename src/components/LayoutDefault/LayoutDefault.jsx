
import { Layout } from "antd";
import "./LayoutDefault.css";
import { Outlet } from "react-router-dom";
import FooterPage from "../FooterPage/FooterPage";
import Header from "../Header/Header";
import MenuList from "../MenuList/MenuList";

const { Content, Footer, Sider } = Layout;

export default function LayoutDefault() {
    return (
        <>
            <Layout className="layout">
                <header className="header">
                   <Header/>
                </header >
                <Layout className="sublayout">
                    <Sider width="15vw" className="sider">
                        <MenuList />
                    </Sider>
                    <div className="content-footer">
                        <Content className="content">
                            <Outlet />
                        </Content>
                        <Footer className="footer">
                            <FooterPage />
                        </Footer>
                    </div>
                </Layout>
            </Layout>
        </>
    );
}