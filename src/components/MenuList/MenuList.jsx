import './MenuList.css';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import {
    HomeOutlined, UserOutlined, LogoutOutlined, SettingOutlined,
    ExclamationCircleOutlined, ClockCircleOutlined, CalendarOutlined, BarChartOutlined
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPumpSoap } from '@fortawesome/free-solid-svg-icons';

export default function MenuList() {
    const selectedKeys = window.location.pathname;
    return (
        <Menu mode="inline" clasName="menu-bar" selectedKeys={[selectedKeys]}>
            <Menu.Item 
                style={{padding: '30px 20px', fontWeight: 'bold'}}
                key="/" icon={<HomeOutlined style={{ fontSize: 22 }} className="menu-item" />}>
                <NavLink style={{ fontWeight: 'bold' }} to="/">Trang chủ</NavLink>
            </Menu.Item>
            <Menu.Item 
                style={{padding: '30px 20px', fontWeight: 'bold'}}
                key="/device" icon={< ExclamationCircleOutlined style={{ fontSize: 22 }} />}>
                <NavLink style={{ fontWeight: 'bold' }} to="/device">Thông tin thiết bị</NavLink>
            </Menu.Item>
            <Menu.Item 
                style={{padding: '30px 20px', fontWeight: 'bold'}}
                key="/watering" icon={< CalendarOutlined style={{ fontSize: 22 }} className="menu-item" />}>
                <NavLink style={{ fontWeight: 'bold' }} to="/watering">Tưới cây tự động</NavLink>
            </Menu.Item>
            <Menu.Item 
                style={{padding: '30px 20px', fontWeight: 'bold'}}
                key="/pump" icon={< FontAwesomeIcon icon={faPumpSoap} style={{ fontSize: 22 }} className="menu-item" />}>
                <NavLink style={{ fontWeight: 'bold' }} to="/pump">Điều kiển máy bơm</NavLink>
            </Menu.Item>
            <Menu.Item 
                style={{padding: '30px 20px', fontWeight: 'bold'}}
                key="/statistics" icon={< BarChartOutlined style={{ fontSize: 22 }} className="menu-item" />}>
                <NavLink style={{ fontWeight: 'bold' }} to="/statistics">Thống kê </NavLink>
            </Menu.Item>

            <Menu.Item 
                style={{padding: '30px 20px', fontWeight: 'bold'}}
                key="/history" icon={< ClockCircleOutlined style={{ fontSize: 22 }} className="menu-item" />}>
                <NavLink style={{ fontWeight: 'bold' }} to="/history">Lịch sử hoạt động</NavLink>
            </Menu.Item>
            <Menu.Item 
                style={{padding: '30px 20px', fontWeight: 'bold'}}
                key="/thresholds" icon={< SettingOutlined style={{ fontSize: 22 }} className="menu-item" />}>
                <NavLink style={{ fontWeight: 'bold' }} to="/thresholds">Ngưỡng cho phép</NavLink>
            </Menu.Item>
            <Menu.Item 
                style={{padding: '30px 20px', fontWeight: 'bold'}}
                key="/user" icon={<UserOutlined style={{ fontSize: 22 }} className="menu-item" />}>
                <NavLink style={{ fontWeight: 'bold' }} to="/user">Thông tin người dùng</NavLink>
            </Menu.Item>
            {/* <Menu.Item key="/logout" icon={<LogoutOutlined style={{ fontSize: 22 }} className="menu-item" />}>
                <NavLink style={{fontWeight: 'bold'}} to="/logout">Logout</NavLink>
            </Menu.Item> */}
        </Menu>
    );
}