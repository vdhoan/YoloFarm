import React from 'react';
import './login-bar.css';
import logo from '../../assets/logo.svg'; 
import '../HomeNavBar/home-navbar.css'; 
const LoginBar = () => {
    return (
        <div className="wrapper">
            <div className="navbar">
                <div className="left-header">
                    <img className="logo-login" src={logo} alt="YOLO FARM" />
                    <h2 className="name"> YOLO FARM</h2>
                </div>
                   
                <div className="email">
                        Email: yolo.farm@gmail.com
                </div>
                
            </div>
            <div className="login-bar">
                <h2>Kết nối tới YOLO FARM</h2>
                <form>
                    <input type="text" placeholder="Tài khoản" />
                    <input type="password" placeholder="Mật khẩu" />
                    <div className="forgot-password">
                        Quên mật khẩu? Liên hệ ngay với chúng tôi tại hotline: 1900 000 000
                    </div>
                    <button type="submit">Đăng nhập</button>
                </form>
            </div>
        </div>
    );
};

export default LoginBar;
