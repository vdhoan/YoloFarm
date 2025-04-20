
import { Layout } from "antd";
import "./LayoutDefault.css";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import MenuList from "../MenuList/MenuList";
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from "@ant-design/icons"
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../Context/userContext";
import { NavLink } from "react-router-dom";
import { logout } from "../../services/Api";

const { Content, Sider } = Layout;

export default function LayoutDefault() {
    const [modal, setModal] = useState(false)
    const { userData } = useContext(UserContext);
    const [confirmLogout, setConfirmLogout] = useState(false)
    const navigate = useNavigate()
    const isMobile = window.innerWidth <= 768;
    // const [menuFold, setMenuFold] = useState(true)
    const [collapsed, setCollapsed] = useState(false);
    // const toggleCollapsed = () => {
    //   setCollapsed(!collapsed);
    // };
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setModal(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    const handleClick = () => {
        setCollapsed(!collapsed);
    }
    const handleLockout = () => {
        const token = localStorage.getItem("token")
        const response = logout(token)
        console.log(response)
        localStorage.removeItem("token")
        navigate("/login")

    }
    return (

        <>
            <div className="layout">
                <header className="header">
                    <div className="navbar">
                        <div className="left-header">
                            <img className="logo" src={logo} alt="YOLO FARM" />
                            <h2 className="yolofarm">YOLO FARM</h2>
                            <div className="menu-icon"
                                onClick={handleClick}
                            >
                                {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                            </div>


                        </div>
                        <div className="profile">
                            <i className="fa-regular fa-user"></i>
                            <h2>{userData ? userData.name : "Loading..."}</h2>
                            <div ref={dropdownRef}>
                                {modal ? (
                                    <div >
                                        <i onClick={() => setModal(!modal)} className="fa-solid fa-angle-up"></i>
                                    </div>

                                ) : (
                                    <i onClick={() => setModal(!modal)} className="fa-solid fa-angle-down"></i>)}
                                {modal && (
                                    <ul className="modal-logout">
                                        <NavLink to="/user" >
                                            <li className="link-myinfor">Thông tin cá nhân</li>
                                        </NavLink>

                                        <li onClick={() => setConfirmLogout(true)} className="link-logout">Đăng xuất</li>


                                    </ul>
                                )}
                            </div>


                            {confirmLogout && (
                                <div className="modal-overlay">
                                    <div className="confirm-logout">
                                        <p>Bạn có chắc chắn muốn đăng xuất không ?</p>
                                        <div className="confirm-logout-btn">
                                            <button className="yes" onClick={handleLockout}> Có</button>
                                            <button className="no" onClick={() => setConfirmLogout(false)}>Không</button>
                                        </div>

                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                </header >
                <Layout className="sublayout">
                    {/* <Sider width="15vw" className="sider">
                        {/* <MenuList props={collapsed} /> }
                        <MenuList collapsed={collapsed} />

                    </Sider> */}
                    <Sider width="15vw" className="sider" collapsed={collapsed} collapsedWidth={80} trigger={null}>
                        <MenuList collapsed={collapsed} />
                    </Sider>


                    <Content className="content">
                        <Outlet />
                    </Content>

                </Layout>
            </div>
        </>
    );
}