import { useEffect } from "react";
import { getThresholds, getTemperature, getHumidity, getSoilMoisture } from "../../services/Api"; // sửa lại path theo bạn
import { useNotification } from "../Context/WarningContext.jsx";

const GlobalWarningChecker = ({ token }) => {
  const { showMessage } = useNotification();

  useEffect(() => {
    const checkWarnings = async () => {
      try {
        const thresholds = await getThresholds(token);
        const temp = await getTemperature();
        const hum = await getHumidity();
        const soil = await getSoilMoisture();

        const tempVal = temp?.data?.[0]?.value;
        const humVal = hum?.data?.[0]?.value;
        const soilVal = soil?.data?.[0]?.value;

        // Kiểm tra từng loại cảnh báo
        if (tempVal > thresholds.temperature.maxValue) {
          showMessage("Nhiệt độ cao hơn ngưỡng!");
        } else if (tempVal < thresholds.temperature.minValue) {
          showMessage("Nhiệt độ thấp hơn ngưỡng!");
        }

        if (humVal > thresholds.humidity.maxValue) {
          showMessage(" Độ ẩm không khí cao hơn ngưỡng!");
        } else if (humVal < thresholds.humidity.minValue) {
          showMessage(" Độ ẩm không khí thấp hơn ngưỡng!");
        }

        if (soilVal > thresholds.soilMoisture.maxValue) {
          showMessage(" Độ ẩm đất cao hơn ngưỡng!");
        } else if (soilVal < thresholds.soilMoisture.minValue) {
          showMessage(" Độ ẩm đất thấp hơn ngưỡng!");
        }

      } catch (err) {
        console.error("Lỗi kiểm tra ngưỡng:", err);
      }
    };

    const interval = setInterval(() => {
      checkWarnings();
    }, 10000); // kiểm tra mỗi 10 giây, có thể chỉnh tùy bạn

    return () => clearInterval(interval);
  }, [token, showMessage]);

  return null; // không cần hiển thị gì
};

export default GlobalWarningChecker;
