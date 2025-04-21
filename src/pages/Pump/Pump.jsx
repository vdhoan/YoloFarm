import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Table, DatePicker, Button, notification } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import pump from '../../assets/image15.png';
import schedule from '../../assets/image16.png';
import { controlPump, getStatusPump } from '../../services/Api';
import './Pump.css';


const columns = [
    {
        title: 'Ngày',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text) => new Date(text).toLocaleDateString(),
    },
    {
        title: 'Thời gian',
        dataIndex: 'created_at',
        key: 'time',
        render: (text) => new Date(text).toLocaleTimeString(),
    },
    {
        title: 'Trạng thái',
        dataIndex: 'value',
        key: 'value',
        render: (value) => (value === "1" ? "Đang bơm" : "Đã tắt"),
    },
];

export default function PumpAndHistory() {
    const token = localStorage.getItem('token');
    const [isOn, setIsOn] = useState(false);
    const [pumpStatus, setPumpStatus] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getStatusPump(token);
                setIsOn(Boolean(Number(res.data[0]?.value)));
                setPumpStatus(res.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu máy bơm:', error);
            }
        };
        fetchData();
    }, [isOn,token]);

    // Handle pump control
    const handleChangePump = async () => {
        const newStatus = !isOn;
        try {
            const result = await controlPump(newStatus ? '1' : '0');
            setIsOn(Boolean(Number(result.data.value)));
            notification[newStatus ? 'success' : 'error']({
                description: newStatus ? 'Máy bơm đang bật!' : 'Máy bơm đã tắt!',
            });
        } catch (error) {
            console.error('Lỗi điều khiển máy bơm:', error);
            notification.error({ description: 'Đã xảy ra lỗi khi điều khiển máy bơm!' });
        }
    };

    return (
        <div className="pump-and-history-container">
            <div className="left-side">
                <div className="pump-control card">
                    <img className="pump-image" src={pump} alt="Pump" />
                    <h4 className={isOn ? 'status-on' : 'status-off'}>
                        Trạng thái: {isOn ? 'Đang bơm' : 'Đã tắt'}
                    </h4>
                    <button
                        className={`pump-button ${isOn ? 'off-pump' : 'on-pump'}`}
                        onClick={handleChangePump}
                    >
                        {isOn ? 'TẮT' : 'BẬT'}
                    </button>
                </div>

                <div className="pump-schedule card">
                    <img className="pump-image" src={schedule} alt="Schedule" />
                    <button className="schedule-button">
                        <NavLink to="/watering">Tạo/Xem lịch tưới</NavLink>
                    </button>
                </div>
            </div>

            <div className="right-side">
                <h2 className="history-title">LỊCH SỬ BƠM NƯỚC</h2>
                <div className="filter-history">
                    <DatePicker placeholder="Chọn ngày" />
                    <DatePicker picker="month" placeholder="Chọn tháng" />
                    <Button type="primary">
                        Tìm kiếm <FilterOutlined />
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={pumpStatus}
                    pagination={{
                        pageSize: 8,
                        showSizeChanger: false,
                    }}
                    rowKey={(record) => record.id}
                    size="small"
                    className="history-table"
                />
            </div>
        </div>
    );
}