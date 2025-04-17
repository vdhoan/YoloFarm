import logo from '../../assets/logo.svg';
// import LogoutButton from "../logoutButton/logout";
import './Header.css'
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";


export default function Header() {
    return (

        <div className="navbar">
            <div className="left-header">
                <img className="logo" src={logo} alt="YOLO FARM" />
                <h2 className="yolofarm">YOLO FARM</h2>
            </div>

            <div className="log-out-button">
                <Button
                    variant="fab"
                    startIcon={<LogoutIcon />}
                    sx={{
                        backgroundColor: "#4CAF50",
                        color: "#000",
                    }}
                >
                </Button>
            </div>
        </div>


    );
}