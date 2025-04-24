import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  function decodeJWT(token) {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (e) {
      return null;
    }
  }

  useEffect(() => {
    if (!token) {
      toast.error("Vui lòng đăng nhập để truy cập");
    }
  }, [token]);

  if (!token) return <Navigate to="/about" />;

  const decodedToken = decodeJWT(token);
  if (!decodedToken) {
    toast.error("Token không hợp lệ, vui lòng đăng nhập lại");
    localStorage.removeItem("token");
    return <Navigate to="/about" />;
  }

  const timeUntilExpiry = decodedToken.exp - Date.now() / 1000;
  if (timeUntilExpiry < 0) {
    toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return children;
}
