import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Table, DatePicker, Button, notification } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import pump from '../../assets/image15.png';
import schedule from '../../assets/image16.png';
import { controlPump, getStatusPump } from '../../services/Api';
import './Pump.css';
import dayjs from 'dayjs';

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
        render: (value) => (value === '1' ? 'Đang bơm' : 'Đã tắt'),
    },
];

export default function PumpAndHistory() {
    const token = localStorage.getItem('token');
    const [isOn, setIsOn] = useState(false);
    const [pumpStatus, setPumpStatus] = useState([]);
    const [filteredStatus, setFilteredStatus] = useState([]); 
    const [selectedDate, setSelectedDate] = useState(null); 
    const [selectedMonth, setSelectedMonth] = useState(null); 

    
    const fetchPumpStatus = async () => {
        try {
            const res = await getStatusPump(token);
            setPumpStatus(res.data);
            setFilteredStatus(res.data); 
            if (res.data.length > 0) {
                setIsOn(Boolean(Number(res.data[0]?.value)));
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu máy bơm:', error);
            notification.error({ description: 'Lỗi khi lấy dữ liệu máy bơm!' });
        }
    };

   
    useEffect(() => {
        fetchPumpStatus();
    }, [isOn, token]);

    
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

   
    const handleSearch = () => {
        if (!selectedDate && !selectedMonth) {
            setFilteredStatus(pumpStatus); 
            return;
        }

        const filteredData = pumpStatus.filter((item) => {
            const itemDate = dayjs(item.created_at);
            const matchDate = selectedDate
                ? itemDate.isSame(dayjs(selectedDate), 'day')
                : true;
            const matchMonth = selectedMonth
                ? itemDate.isSame(dayjs(selectedMonth), 'month')
                : true;
            return matchDate && matchMonth;
        });

        setFilteredStatus(filteredData); 
    };

    
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    
    const handleMonthChange = (month) => {
        setSelectedMonth(month);
    };

   
    const handleClearFilter = () => {
        setSelectedDate(null);
        setSelectedMonth(null);
        setFilteredStatus(pumpStatus); 
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
                    <DatePicker
                        placeholder="Chọn ngày"
                        onChange={handleDateChange}
                        value={selectedDate}
                        format="DD/MM/YYYY"
                    />
                    <DatePicker
                        picker="month"
                        placeholder="Chọn tháng"
                        onChange={handleMonthChange}
                        value={selectedMonth}
                        format="MM/YYYY"
                    />
                    <Button type="primary" onClick={handleSearch}>
                        Tìm kiếm <FilterOutlined />
                    </Button>
                    <Button onClick={handleClearFilter}>Xóa bộ lọc</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredStatus} 
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