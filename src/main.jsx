import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import App from './App.jsx'
import LoginBar from './components/ui/login-bar'
import HomeNavBar from './components/ui/home-navbar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HomeNavBar />
    <LoginBar />
    <App />
  </StrictMode>,
)
