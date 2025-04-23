import React, { createContext, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [newWarningTrigger, setNewWarningTrigger] = useState(0); 

  const showError = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const triggerNewWarning = () => {
    setNewWarningTrigger((prev) => prev + 1); 
  };

  return (
    <NotificationContext.Provider value={{ showError, triggerNewWarning, newWarningTrigger }}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);