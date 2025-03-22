import React from 'react';
import logo from '../../assets/logo.svg'; 
import '../../assets/home-navbar.css'; 

const HomeNavBar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="YOLO FARM" />
            </div>
            <div className="yolofarm">
                YOLO FARM
            </div>
            <div className="email">
                Email: yolo.farm@gmail.com
            </div>
        </div>
    );
};

export default HomeNavBar;
