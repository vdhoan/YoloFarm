import { NavLink } from 'react-router-dom';
import './Pump.css';
import pump from '../../assets/image15.png';
import schedule from '../../assets/image16.png';
import { useEffect, useState } from 'react';
import { controlPump, getStatusPump } from '../../services/Api';
import { notification } from 'antd'

export default function Pump() {
    const [isOn, setIsOn] = useState(true);
    // const [changePump, setChangePump] = useState("0")
    useEffect(() => {
        const fetchStatusPump = async () => {
            const res = await getStatusPump()
            // console.log(res.data)
            setIsOn(Boolean(Number(res.data[0].value)));

        }
        fetchStatusPump();
    }, [isOn])
    const handleChangePump = async () => {
        console.log(isOn)

        // console.log(changePump)
        const newStatus = !isOn;
        const result = await controlPump(newStatus ? "1" : "0")
        // console.log(result.data.value)
        setIsOn(Boolean(Number(result.data.value)))

        if (newStatus) {
            notification.success({
                // message: "Thành công",
                description: "Máy bơm đang bật!"
            })
        }
        else {
            notification.error({
                // message: "Thất bại",
                description: "Máy bơm đã tắt!"
            })
        }
    }


    return (
        <div className='pump'>
            <div className='pump-control'>
                <img src={pump} alt="img" />
                <h3 style={{ textAlign: "center", color: isOn ? "#28a745" : "#888" }}>
                    Trạng thái: {isOn ? "Đang bơm" : "Đã tắt"}
                </h3>

                <div className='pump-button'>
                    <button className={`button ${isOn ? "off-pump" : "on-pump"}`} onClick={handleChangePump}>{isOn ? "TẮT" : "BẬT"}</button>

                </div>

            </div>
            <div className='pump-schedule'>
                <img src={schedule} alt="img" />
                <div className='pump-schedule-button'>
                    <button className='button link-watering'>
                        <NavLink to="/watering">Tạo/Xem lịch tưới</NavLink>
                    </button>
                </div>

            </div>
        </div>
    );
}