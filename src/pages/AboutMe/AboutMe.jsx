import React from "react";
import { NavLink } from 'react-router-dom';
import "./AboutMe.css";
import {
    PhoneOutlined,
    MailOutlined,
    MessageOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    FacebookOutlined,
    InstagramOutlined,
    YoutubeOutlined,
} from '@ant-design/icons';
import Logo from "../../assets/logo.svg";

const newsData = [
    {
        img: 'https://th.bing.com/th/id/OIP.JkUlufCZFq4VjsK9-ZwIIAHaFj?rs=1&pid=ImgDetMain',
        title: 'Ứng dụng giám sát cho phép quản lý vườn từ xa',
        desc: 'Điều khiển thiết bị và thu thập dữ liệu từ xa, giúp quản lý và chăm sóc cây trồng hiệu quả, tiết kiệm thời gian và chi phí.',
    },
    {
        img: 'https://ctisupply.vn/wp-content/uploads/2022/04/screenshot-1650262981-607x400.png',
        title: 'Bộ cảm biến thu thập dữ liệu theo thời gian thực',
        desc: 'Giám sát nhiệt độ, độ ẩm không khí và đất 24/24. Cảnh báo khi vượt ngưỡng cho phép, giúp giám sát hiệu quả.',
    },
    {
        img: 'https://png.pngtree.com/png-clipart/20250124/original/pngtree-electric-water-pump-engulfed-in-splashing-isolated-on-white-background-png-image_20328957.png',
        title: 'Đặt lịch và điều khiển máy bơm nước dễ dàng',
        desc: 'Dựa vào thông số để điều khiển tưới nước từ xa. Hệ thống hỗ trợ đặt lịch tưới tự động.',
    },
];


const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

export default function AboutMe() {
    return (
        <div className="partner-page">
            <nav className="navbar-about">
                <div className="left-header">
                    <img className="logo-login" src={Logo} alt="YOLO FARM" />
                    <h2 className="name">YOLO FARM</h2>
                </div>
               <div className="right-about">
               <a className="link-about" href="#about" onClick={() => scrollToSection('about')}>
                    Giới thiệu
                </a>
                <a className="link-about" href="#news" onClick={() => scrollToSection('news')}>
                    Tin tức
                </a>
                <a className="link-about" href="#devices" onClick={() => scrollToSection('devices')}>
                    Thiết bị
                </a>
                <a className="link-about" href="#contact" onClick={() => scrollToSection('contact')}>
                    Liên hệ
                </a>
                <NavLink to="/login" className="logins-button">
                    Đăng nhập
                </NavLink>
               </div>
                
            </nav>

            
            <div id="about" className="main-content">
                <div className="text-section">
                    <h1>
                        Trở thành <span className="highlight">đối tác</span><br />
                        của <span className="highlight">chúng tôi</span>
                    </h1>
                    <p>
                        Chúng tôi mong muốn đóng góp vào nguồn cung thực phẩm toàn cầu và nâng cao chất lượng vườn cây bằng thiết bị hiện đại, giúp quản lý dễ dàng hơn.
                    </p>
                    
                    <button
                        className="cta-button"
                        onClick={() => scrollToSection('contact')}
                    >
                        Đăng ký ngay
                    </button>
                </div>
                <div className="image-section">
                    <img
                        src="https://www.nextfarm.vn/wp-content/uploads/2021/10/image-asset.jpeg"
                        alt="Hình ảnh vườn"
                        className="image"
                    />
                </div>
            </div>

            
            <div id="news">
                <h2 className="customer">Một số khách hàng tiêu biểu</h2>
                <div className="feature-section green-bg">
                    <div className="feature-text">
                        <h2>Phòng thí nghiệm <strong>Quốc gia</strong></h2>
                        <p>
                            Trong nghiên cứu giống cây mới, giám sát tự động các thông số là điều cần thiết. Chúng tôi là sự lựa chọn hoàn hảo.
                        </p>
                        
                        <a
                            href="https://baophapluat.vn/du-an-vuon-thong-minh-cua-nhom-sinh-vien-me-cong-nghe-post269078.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="logins-button"
                        >
                            Tìm hiểu thêm
                        </a>
                    </div>
                    <div className="feature-image">
                        <img
                            src="https://bizweb.dktcdn.net/thumb/grande/100/320/515/articles/1.jpg?v=1533224148527"
                            alt="Nhà kính cà chua"
                        />
                    </div>
                </div>

                <div className="feature-section pink-bg reverse">
                    <div className="feature-image">
                        <img
                            src="https://file.hstatic.net/1000362368/file/cam_bien_cho_nha_kinh_aba2c667221e4db589fa3aa86670cf7e_grande.jpg"
                            alt="Cảm biến nhà kính"
                        />
                    </div>
                    <div className="feature-text">
                        <h2>Tatayoyo: <strong>Hiệu quả bất ngờ</strong></h2>
                        <p>
                            Hộ kinh doanh nhỏ áp dụng công nghệ vườn thông minh, hiệu quả tăng rõ rệt.
                        </p>
                        <a
                            href="https://bkaii.com.vn/tin-tuc-chung/137-he-thong-vuon-thong-minh-cho-gia-dinh" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-button small"
                        >
                            Khám phá thêm
                        </a>
                    </div>
                </div>

                <div className="feature-section blue-bg reverse">
                    <div className="feature-text">
                        <h2>Công ty Toronto: <strong>Doanh thu tăng mạnh</strong></h2>
                        <p>
                            Ứng dụng quản lý thông minh vào sản xuất giúp tiết kiệm nhân công, tăng lợi nhuận hàng tỉ đồng mỗi năm.
                        </p>
                        <a
                            href="https://vuonthongminh.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="logins-button"
                        >
                            Xem chi tiết
                        </a>
                    </div>
                    <div className="feature-image">
                        <img
                            src="http://vietmychem.com.vn/Thang8/hoachat_vietmy_1203419w/upload/images/Tin%20tuc/C%C3%B4ng%20Ngh%E1%BB%87%20Nh%C3%A0%20K%C3%ADnh%20Th%C3%B4ng%20Minh%20(3).jpg"
                            alt="Công nghệ nhà kính"
                        />
                    </div>
                </div>
            </div>

           
            <div id="devices" className="news-section">
                <h2 className="news-title">Thiết bị</h2>
                <div className="news-grid">
                    {newsData.map((item, idx) => (
                        <div className="news-card" key={idx}>
                            <img src={item.img} alt="Thiết bị" className="news-image" />
                            <div className="news-content">
                                <h3 className="news-headline">{item.title}</h3>
                                <p className="news-desc">{item.desc}</p>
                                <a
                                    href="https://eos.com/products/crop-monitoring/" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="news-button"
                                >
                                    Chi tiết
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            
            <div id="contact" className="contact-wrapper">
                <div className="contact-header">
                    <span className="contact-subtitle">Liên hệ</span>
                    <h2>Bạn muốn biết thêm? Hãy trò chuyện cùng chúng tôi!</h2>
                </div>
                <div className="contact-grid">
                    <div className="contact-card">
                        <img
                            src="https://www.priva.com/media/rp4jqmna/fred-ruijgt.jpg"
                            alt="Manuel Madani"
                            className="contact-avatar"
                        />
                        <h3>Manuel Madani</h3>
                        <div className="contact-info">
                            <div className="contact-item">
                                <PhoneOutlined className="contact-icon" />
                                <span>+66 991 949 796</span>
                            </div>
                            <div className="contact-item">
                                <MailOutlined className="contact-icon" />
                                <span>manuel.madani@priva.com</span>
                            </div>
                            <div className="contact-item">
                                <MessageOutlined className="contact-icon" />
                                <span>Gửi tin nhắn</span>
                            </div>
                        </div>
                    </div>
                    <div className="contact-card">
                        <img
                            src="https://www.priva.com/media/berd0kps/manuel-madani.jpg"
                            alt="Priva China"
                            className="contact-avatar"
                        />
                        <h3>Priva China</h3>
                        <div className="contact-info">
                            <div className="contact-item">
                                <PhoneOutlined className="contact-icon" />
                                <span>+86 138 1172 5705</span>
                            </div>
                            <div className="contact-item">
                                <MailOutlined className="contact-icon" />
                                <span>service.cn@priva.com</span>
                            </div>
                            <div className="contact-item">
                                <MessageOutlined className="contact-icon" />
                                <span>Gửi tin nhắn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src={Logo} alt="Logo Rijk Zwaan" />
                        <h2>YOLO FARM</h2>
                    </div>
                    <div className="footer-column">
                        <h4>Rijk Zwaan</h4>
                        <ul>
                            <li>Về chúng tôi</li>
                            <li>Quan điểm</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Chọn giống rau</h4>
                        <ul>
                            <li>Giải pháp</li>
                            <li>Liên hệ</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Liên hệ</h4>
                        <p>+31(0)174 532 300</p>
                        <p>info@rijkzwaan.com</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© Rijk Zwaan Zaadteelt en Zaadhandel B.V.</p>
                    <div className="footer-links">
                        <a href="#">Điều khoản</a>
                        <a href="#">Chính sách bảo mật</a>
                        <a href="#">Thông tin sản phẩm</a>
                    </div>
                    <div className="footer-social">
                        <LinkedinOutlined />
                        <TwitterOutlined />
                        <FacebookOutlined />
                        <InstagramOutlined />
                        <YoutubeOutlined />
                    </div>
                </div>
            </footer>
        </div>
    );
}