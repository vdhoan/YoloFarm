import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PrivateRoute({ token, children }) {
  function decodeJWT(token) {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (e) {
      return null;
    }
  }

  // if (!token) {
  //   toast.error("Vui lòng đăng nhập để truy cập");
  //   return <Navigate to="/login" />;
  // }

  const decodedToken = decodeJWT(token);

  // if (!decodedToken) {
  //   toast.error("Token không hợp lệ, vui lòng đăng nhập lại");
  //   localStorage.removeItem("token");
  //   return <Navigate to="/login" />;
  // }

  const timeUntilExpiry = decodedToken.exp - Date.now() / 1000;

  if (timeUntilExpiry < 0) {
    toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return children;
}
