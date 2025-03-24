import logo from '../../assets/logo.svg';
import '../../pages/HomeNavBar/home-navbar.css';

export default function Header() {
    return (

        <div className="navbar">
            <div className="left-header">
                <img className="logo" src={logo} alt="YOLO FARM" />
                <h2 className="yolofarm">YOLO FARM</h2>
            </div>
            
            <div className="email">
                infor user
            </div>
        </div>


    );
}