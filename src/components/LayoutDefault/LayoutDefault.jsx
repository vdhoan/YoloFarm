
import { Layout } from "antd";
import "./LayoutDefault.css";
import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.svg";
import MenuList from "../MenuList/MenuList";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
// import {Button } from 'antd'
import { useState } from "react";

const { Content, Footer, Sider } = Layout;

export default function LayoutDefault() {
    const isMobile = window.innerWidth <= 768;
    const [menuFold, setMenuFold] = useState(true)
    const handleClick = () => {
        setMenuFold(true)
    }
    return (

        <>
            <div className="layout">
                <header className="header">
                    <div className="navbar">
                        <div className="left-header">
                            <img className="logo" src={logo} alt="YOLO FARM" />
                            <h2 className="yolofarm">YOLO FARM</h2>
                            {/* <div className="inline-block bg-[#4CAF50] hover: bg-[#4CAF50]  p-4 flex item-center cursor-pointer " onClick={handleClick}>
                                {menuFold ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                            </div> */}
                            <div
                                className=" px-2 flex items-center justify-center cursor-pointer rounded transition duration-300"
                                onClick={handleClick}
                            >
                                {menuFold ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                            </div>



                        </div>

                        <div >
                            infor user
                        </div>






                    </div>
                </header >
                <Layout className="sublayout">
                    <Sider width="15vw" className="sider">
                        <MenuList />
                    </Sider>

                    <Content className="content">
                        <Outlet />
                    </Content>

                </Layout>
            </div>
        </>
    );
}