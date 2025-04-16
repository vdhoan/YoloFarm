import { NavLink } from 'react-router-dom';
import './Pump.css';
import pump from '../../assets/image15.png';
import schedule from '../../assets/image16.png';
// import { useState } from 'react';
// import { Button } from 'antd';

export default function Pump() {
    // const [isOn, setIsOn] = useState(false);
    return (
        <div className='pump'>
           <div className='pump-control'>
                <img src={pump} alt="img" />
                <div className='pump-button'> 
                    <button className='button on-pump'>BẬT</button>
                    <button className='button off-pump'>TẮT</button> 
                </div>
                      
           </div>
           <div className='pump-schedule'>
                <img src={schedule} alt="img" />
                <div className='pump-schedule-button'>
                    <button className='button link-watering'>
                        <NavLink to="/watering">Tạo lịch tưới</NavLink>
                    </button>
                    <button className='button link-watering'>
                        <NavLink to="/---">Xem lịch tưới</NavLink>
                        
                    </button>
                </div>
                
           </div>
        </div>
    );
}