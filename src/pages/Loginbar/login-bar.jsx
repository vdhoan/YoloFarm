import React from 'react';
import './login-bar.css';
import logo from '../../assets/logo.svg';
import '../HomeNavBar/home-navbar.css';
import { useState } from 'react';
import { postLogin } from '../../services/Api';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'




const LoginBar = () => {
    const [usename, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    // useEffect( ()=>{

    // },[])

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)

            const result = await postLogin(usename, password)
            console.log(result)
            if (result.success === true) {
                toast.success("Đăng nhập thành công")

                localStorage.setItem("token", result.data.token)
                navigate("/")
            }
            else if (result.status === 401) {
                toast.error(result.data.error)
            }
            else {
                toast.error("Server error")
            }

            return result
        }
        catch (err) {
            console.log("call api", err)
            toast.error("Username/ Mật khẩu không đúng")

        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className="wrapper">
            <div className="navbar">
                <div className="left-header">
                    <img className="logo-login" src={logo} alt="YOLO FARM" />
                    <h2 className="name"> YOLO FARM</h2>
                </div>

                <div className="email">
                    Email: yolo.farm@gmail.com
                </div>

            </div>
            <div className="login-bar">
                <h2>Kết nối tới YOLO FARM</h2>
                <form onSubmit={handleLogin}>
                    <input
                        className='input-usename'
                        type="text"
                        placeholder="Tài khoản"
                        value={usename}
                        onChange={(e) => { setUsername(e.target.value) }}
                        required />
                    <div className='password'>
                        <input
                            className='input-password'
                            type={showPassword ? "text" : "password"}
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            required />
                        <span onClick={()=>setShowPassword(!showPassword)}>
                            {showPassword ? 
                             (
                                <i className="fas fa-eye"></i>
                            ): (
                                <i className="fas fa-eye-slash"></i>
                            ) }
                        </span>
                    </div>


                    <div className="forgot-password">
                        Quên mật khẩu? Liên hệ ngay với chúng tôi tại hotline: 1900 000 000
                    </div>
                    <button
                        type="submit"
                        disabled={usename && password ? false : true}
                        className={usename && password ? "active-login" : ""}
                    >{loading && <i className="fas fa-circle-notch fa-spin"></i>}  Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginBar;
