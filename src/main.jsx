// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './components/Context/userContext.jsx'
import { NotificationProvider } from './components/Context/WarningContext.jsx';

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <NotificationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NotificationProvider>

  </AppProvider>

)
