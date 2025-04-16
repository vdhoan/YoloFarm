import React from 'react';
import background from '../../assets/background.jpg';
import './home-navbar.css'; 
const HomeNavBar = () => {
    return (
        <div className='home'>
            <img className="home-page" src={background} alt="img" />
        </div>
        
    );
};

export default HomeNavBar;
