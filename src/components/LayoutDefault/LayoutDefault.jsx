
import { Layout } from "antd";
import "./LayoutDefault.css";
import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.svg";
import MenuList from "../MenuList/MenuList";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { useContext, useState } from "react";
import { UserContext } from "../Context/userContext";


const { Content, Footer, Sider } = Layout;

export default function LayoutDefault() {
    const [modal, setModal] = useState(false)
    const {userData }= useContext(UserContext);

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
                            <div
                                className=" px-2 flex items-center justify-center cursor-pointer rounded transition duration-300"
                                onClick={handleClick}
                            >
                                {menuFold ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                            </div>
                        </div>
                        <div className="profile">
                                <i className="fa-regular fa-user"></i>
                                <h2>{userData ? userData.name : "Loading..."}</h2>

                                {modal ? (
                                    <div >
                                        <i onClick={()=>setModal(!modal)} className="fa-solid fa-angle-up"></i> 
                                    </div>
                                        
                                ) : (
                                    <i className="fa-solid fa-angle-down"></i>)
                                   }
                                {modal && (
                                    <ul>
                                        <li>Thông tin cá nhân</li>
                                        <li>Đăng xuất</li>
                                    </ul>
                                )}
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