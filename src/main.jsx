import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoginBar from './assets/login-bar'
import HomeNavBar from './assets/home-navbar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HomeNavBar />
    <LoginBar />
    <App />
  </StrictMode>,
)
