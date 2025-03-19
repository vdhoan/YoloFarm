import React from 'react';
import logo from './logo.svg'; // Adjust the path according to your project structure
import '../styling/home-navbar.css'; // Ensure this path is correct as well

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
