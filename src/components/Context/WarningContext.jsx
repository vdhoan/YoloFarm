// contexts/NotificationContext.js
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 5000); // Ẩn sau 5s (tùy chỉnh được)
  };

  return (
    <NotificationContext.Provider value={{ message, showMessage }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
