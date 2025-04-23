// src/services/SensorService.js
import { useEffect, useState, useRef } from 'react';
import { useNotification } from '../components/Context/WarningContext';
import { getThresholds, getTemperature, getHumidity, getSoilMoisture, postWarning } from './Api';

export const useSensorMonitoring = (token) => {
  const { showError, triggerNewWarning } = useNotification();
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [soilMoisture, setSoilMoisture] = useState([]);
  const [thresholds, setThresholds] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const lastWarningTimestamps = useRef({
    temperature: 0,
    humidity: 0,
    soilMoisture: 0,
  });
  const WARNING_COOLDOWN = 60000; 

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOut((prev) => !prev);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const thresholdsResponse = await getThresholds(token);
        const temperatureResponse = await getTemperature();
        const humidityResponse = await getHumidity();
        const soilMoistureResponse = await getSoilMoisture();
        //console.log('threshold',thresholdsResponse)
        setThresholds(thresholdsResponse);
        setTemperature(temperatureResponse.data);
        setHumidity(humidityResponse.data);
        setSoilMoisture(soilMoistureResponse.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        showError('Lỗi khi lấy dữ liệu cảm biến');
      }
    };

    fetchData();
  }, [timeOut, token]);

  useEffect(() => {
    const sendWarnings = async () => {
      if (
        temperature?.[0]?.value != null &&
        humidity?.[0]?.value != null &&
        soilMoisture?.[0]?.value != null &&
        thresholds?.temperature != null &&
        thresholds?.humidity != null &&
        thresholds?.soilMoisture != null
      ) {
        const now = Date.now();

        const tempVal = temperature[0].value;
        const tempMin = thresholds.temperature.minValue;
        const tempMax = thresholds.temperature.maxValue;

        if (tempVal > tempMax && now - lastWarningTimestamps.current.temperature > WARNING_COOLDOWN) {
          await postWarning(token, {
            sensorType: 'temperature',
            currentValue: Number(tempVal),
            message: 'Nhiệt độ cao hơn ngưỡng',
          });
          showError('Nhiệt độ cao hơn ngưỡng');
          lastWarningTimestamps.current.temperature = now;
          triggerNewWarning();
        } else if (tempVal < tempMin && now - lastWarningTimestamps.current.temperature > WARNING_COOLDOWN) {
          await postWarning(token, {
            sensorType: 'temperature',
            currentValue: Number(tempVal),
            message: 'Nhiệt độ thấp hơn ngưỡng',
          });
          showError('Nhiệt độ thấp hơn ngưỡng');
          lastWarningTimestamps.current.temperature = now;
          triggerNewWarning();
        }

        const humVal = humidity[0].value;
        const humMin = thresholds.humidity.minValue;
        const humMax = thresholds.humidity.maxValue;

        if (humVal > humMax && now - lastWarningTimestamps.current.humidity > WARNING_COOLDOWN) {
          await postWarning(token, {
            sensorType: 'humidity',
            currentValue: Number(humVal),
            message: 'Độ ẩm không khí cao hơn ngưỡng',
          });
          showError('Độ ẩm không khí cao hơn ngưỡng');
          lastWarningTimestamps.current.humidity = now;
          triggerNewWarning();
        } else if (humVal < humMin && now - lastWarningTimestamps.current.humidity > WARNING_COOLDOWN) {
          await postWarning(token, {
            sensorType: 'humidity',
            currentValue: Number(humVal),
            message: 'Độ ẩm không khí thấp hơn ngưỡng',
          });
          showError('Độ ẩm không khí thấp hơn ngưỡng');
          lastWarningTimestamps.current.humidity = now;
          triggerNewWarning();
        }

        const soilVal = soilMoisture[0].value;
        const soilMin = thresholds.soilMoisture.minValue;
        const soilMax = thresholds.soilMoisture.maxValue;

        if (soilVal > soilMax && now - lastWarningTimestamps.current.soilMoisture > WARNING_COOLDOWN) {
          await postWarning(token, {
            sensorType: 'soilMoisture',
            currentValue: Number(soilVal),
            message: 'Độ ẩm đất cao hơn ngưỡng',
          });
          showError('Độ ẩm đất cao hơn ngưỡng');
          lastWarningTimestamps.current.soilMoisture = now;
          triggerNewWarning();
        } else if (soilVal < soilMin && now - lastWarningTimestamps.current.soilMoisture > WARNING_COOLDOWN) {
          await postWarning(token, {
            sensorType: 'soilMoisture',
            currentValue: Number(soilVal),
            message: 'Độ ẩm đất thấp hơn ngưỡng',
          });
          showError('Độ ẩm đất thấp hơn ngưỡng');
          lastWarningTimestamps.current.soilMoisture = now;
          triggerNewWarning();
        }
      }
    };

    sendWarnings();
  }, [temperature, humidity, soilMoisture, thresholds, token, showError, triggerNewWarning]);

  return { temperature, humidity, soilMoisture, thresholds };
};