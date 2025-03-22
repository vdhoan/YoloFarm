import React from 'react';
import '../../assets/login-bar.css';

const LoginBar = () => {
    return (
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
    );
};

export default LoginBar;
