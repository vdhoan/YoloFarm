import { Routes, Route } from 'react-router-dom'
import HomeNavBar from './pages/HomeNavBar/home-navbar'
import LoginBar from './pages/Loginbar/login-bar'
import AutomaticWatering from './pages/AutomaticWatering/AutomaticWatering'
import LayoutDefault from './components/LayoutDefault/LayoutDefault'
import NotFound from './pages/NotFound/NotFound'
import Divice from './pages/Divice/Divice'
import Pump from './pages/Pump/Pump'
import Statistics from './pages/Statistics/Statistics'
// import History from './pages/HistoryPump/History'
import Thresholds from './pages/Thresholds/Thresholds'
import User from './pages/User/User'
import Warning from './pages/Warning/Warning'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './PrivateRoute/PrivateRoute'
import GlobalWarningChecker from "../src/components/Notify/Notify.jsx";


function App() {
    const token = localStorage.getItem("token")
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginBar />} />
                <Route path="/" element={
                    <PrivateRoute token={token}>
                        <LayoutDefault />
                    </PrivateRoute>

                } >
                <Route index element={
                        <PrivateRoute token={token}>
                            <HomeNavBar />
                        </PrivateRoute>
                    } />
                    <Route path="device" element={
                        <PrivateRoute token={token}>
                            <Divice />
                        </PrivateRoute>
                    } />
                    <Route path="watering" element={
                        <PrivateRoute token={token}>
                            <AutomaticWatering />
                        </PrivateRoute>
                    } />
                    <Route path="pump" element={<PrivateRoute token={token}>
                        <Pump />
                    </PrivateRoute>
                    } />
                    <Route path="statistics" element={<PrivateRoute token={token}>
                        <Statistics />
                    </PrivateRoute>
                    } />
                    {/* <Route path="history" element={<PrivateRoute token={token}>
                        <History />
                    </PrivateRoute>
                    } /> */}
                    <Route path="thresholds" element={<PrivateRoute token={token}>
                        <Thresholds />
                    </PrivateRoute>
                    } />
                    <Route path="user" element={<PrivateRoute token={token}>
                        <User />
                    </PrivateRoute>
                    } />
                    <Route path="warning" element={<PrivateRoute token={token}>
                        <Warning />
                    </PrivateRoute>
                    } />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            <GlobalWarningChecker token={token} />
      
            <ToastContainer />
        </>
    )
}

export default App
