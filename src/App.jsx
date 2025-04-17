import { Routes, Route } from 'react-router-dom'
import HomeNavBar from './pages/HomeNavBar/home-navbar'
import LoginBar from './pages/Loginbar/login-bar'
import AutomaticWatering from './pages/AutomaticWatering/AutomaticWatering'
import LayoutDefault from './components/LayoutDefault/LayoutDefault'
import NotFound from './pages/NotFound/NotFound'
import Divice from './pages/Divice/Divice'
import Pump from './pages/Pump/Pump'
import Statistics from './pages/Statistics/Statistics'
import History from './pages/History/History'
import Thresholds from './pages/Thresholds/Thresholds'
import User from './pages/User/User'
import Warning from './pages/Warning/Warning'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <Routes>        
                <Route path="/login" element={<LoginBar />} /> 
                <Route path="/" element={<LayoutDefault />} >
                    <Route index element={<HomeNavBar />} />
                    <Route path="device" element={<Divice />} />
                    <Route path="watering" element={<AutomaticWatering />} />
                    <Route path="pump" element={<Pump />} />
                    <Route path="statistics" element={<Statistics />} />
                    <Route path="history" element={<History />} />
                    <Route path="thresholds" element={<Thresholds />} />
                    <Route path="user" element={<User />} />
                    <Route path="warning" element={<Warning />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            <ToastContainer/>
        </>
    )
}

export default App
