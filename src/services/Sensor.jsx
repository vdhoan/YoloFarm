// // src/services/SensorService.js
// import { useEffect, useState, useRef } from 'react';
// import { useNotification } from '../components/Context/WarningContext';
// import { getThresholds, getTemperature, getHumidity, getSoilMoisture, postWarning } from './Api';

// export const useSensorMonitoring = (token) => {
//   const { showError, triggerNewWarning } = useNotification();
//   const [temperature, setTemperature] = useState([]);
//   const [humidity, setHumidity] = useState([]);
//   const [soilMoisture, setSoilMoisture] = useState([]);
//   const [thresholds, setThresholds] = useState(null);
//   const [timeOut, setTimeOut] = useState(false);
//   const lastWarningTimestamps = useRef({
//     temperature: 0,
//     humidity: 0,
//     soilMoisture: 0,
//   });
//   const WARNING_COOLDOWN = 120000;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeOut((prev) => !prev);
//     }, 12000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const thresholdsResponse = await getThresholds(token);
//         const temperatureResponse = await getTemperature();
//         const humidityResponse = await getHumidity();
//         const soilMoistureResponse = await getSoilMoisture();
//         console.log('threshold', thresholdsResponse)
//         setThresholds(thresholdsResponse);
//         setTemperature(temperatureResponse.data);
//         setHumidity(humidityResponse.data);
//         setSoilMoisture(soilMoistureResponse.data);
//       } catch (error) {
//         console.error('Lỗi khi lấy dữ liệu:', error);
//         showError('Lỗi khi lấy dữ liệu cảm biến');
//       }
//     };

//     fetchData();
//   }, [timeOut, token]);

//   useEffect(() => {
//     const sendWarnings = async () => {
//       if (
//         temperature?.[0]?.value != null &&
//         humidity?.[0]?.value != null &&
//         soilMoisture?.[0]?.value != null

//       ) {
//         const now = Date.now();
//         if (thresholds?.temperature?.thresholdId != null) {
//           const tempVal = temperature[0].value;
//           const tempMin = thresholds.temperature.minValue;
//           const tempMax = thresholds.temperature.maxValue;

//           if (tempVal > tempMax && now - lastWarningTimestamps.current.temperature > WARNING_COOLDOWN) {
//             await postWarning(token, {
//               sensorType: 'temperature',
//               currentValue: Number(tempVal),
//               message: 'Nhiệt độ cao hơn ngưỡng',
//             });
//             showError('Nhiệt độ cao hơn ngưỡng');
//             lastWarningTimestamps.current.temperature = now;
//             triggerNewWarning();
//           } else if (tempVal < tempMin && now - lastWarningTimestamps.current.temperature > WARNING_COOLDOWN) {
//             await postWarning(token, {
//               sensorType: 'temperature',
//               currentValue: Number(tempVal),
//               message: 'Nhiệt độ thấp hơn ngưỡng',
//             });
//             showError('Nhiệt độ thấp hơn ngưỡng');
//             lastWarningTimestamps.current.temperature = now;
//             triggerNewWarning();
//           }
//         }
//         if (thresholds?.humidity?.thresholdId != null) {
//           const humVal = humidity[0].value;
//           const humMin = thresholds.humidity.minValue;
//           const humMax = thresholds.humidity.maxValue;

//           if (humVal > humMax && now - lastWarningTimestamps.current.humidity > WARNING_COOLDOWN) {
//             await postWarning(token, {
//               sensorType: 'humidity',
//               currentValue: Number(humVal),
//               message: 'Độ ẩm không khí cao hơn ngưỡng',
//             });
//             showError('Độ ẩm không khí cao hơn ngưỡng');
//             lastWarningTimestamps.current.humidity = now;
//             triggerNewWarning();
//           } else if (humVal < humMin && now - lastWarningTimestamps.current.humidity > WARNING_COOLDOWN) {
//             await postWarning(token, {
//               sensorType: 'humidity',
//               currentValue: Number(humVal),
//               message: 'Độ ẩm không khí thấp hơn ngưỡng',
//             });
//             showError('Độ ẩm không khí thấp hơn ngưỡng');
//             lastWarningTimestamps.current.humidity = now;
//             triggerNewWarning();
//           }
//         }
//         if (thresholds?.soilMoisture?.thresholdId != null) {
//           const soilVal = soilMoisture[0].value;
//           const soilMin = thresholds.soilMoisture.minValue;
//           const soilMax = thresholds.soilMoisture.maxValue;

//           if (soilVal > soilMax && now - lastWarningTimestamps.current.soilMoisture > WARNING_COOLDOWN) {
//             await postWarning(token, {
//               sensorType: 'soilMoisture',
//               currentValue: Number(soilVal),
//               message: 'Độ ẩm đất cao hơn ngưỡng',
//             });
//             showError('Độ ẩm đất cao hơn ngưỡng');
//             lastWarningTimestamps.current.soilMoisture = now;
//             triggerNewWarning();
//           } else if (soilVal < soilMin && now - lastWarningTimestamps.current.soilMoisture > WARNING_COOLDOWN) {
//             await postWarning(token, {
//               sensorType: 'soilMoisture',
//               currentValue: Number(soilVal),
//               message: 'Độ ẩm đất thấp hơn ngưỡng',
//             });
//             showError('Độ ẩm đất thấp hơn ngưỡng');
//             lastWarningTimestamps.current.soilMoisture = now;
//             triggerNewWarning();
//           }
//         }
//       }




//     };

//     sendWarnings();
//   }, [temperature, humidity, soilMoisture, thresholds, token, showError, triggerNewWarning]);

//   return { temperature, humidity, soilMoisture, thresholds };
// };  


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
  const WARNING_COOLDOWN = 120000;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOut((prev) => !prev);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(!token) return;
        const thresholdsResponse = await getThresholds(token);
        const temperatureResponse = await getTemperature();
        const humidityResponse = await getHumidity();
        const soilMoistureResponse = await getSoilMoisture();
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
        temperature?.[0]?.value == null ||
        humidity?.[0]?.value == null ||
        soilMoisture?.[0]?.value == null ||
        !thresholds
      ) {
        return;
      }

      const now = Date.now();

      
      const checkAndSendWarning = async (
        sensorType,
        value,
        minValue,
        maxValue,
        highMessage,
        lowMessage
      ) => {
        if (value == null || minValue == null || maxValue == null) return;

        if (
          value > maxValue &&
          now - lastWarningTimestamps.current[sensorType] > WARNING_COOLDOWN
        ) {
          await postWarning(token, {
            sensorType,
            currentValue: Number(value),
            message: highMessage,
          });
          showError(highMessage);
          lastWarningTimestamps.current[sensorType] = now;
          triggerNewWarning();
        } else if (
          value < minValue &&
          now - lastWarningTimestamps.current[sensorType] > WARNING_COOLDOWN
        ) {
          await postWarning(token, {
            sensorType,
            currentValue: Number(value),
            message: lowMessage,
          });
          showError(lowMessage);
          lastWarningTimestamps.current[sensorType] = now;
          triggerNewWarning();
        }
      };

      
      if (thresholds?.temperature?.thresholdId != null) {
        await checkAndSendWarning(
          'temperature',
          temperature[0].value,
          thresholds.temperature.minValue,
          thresholds.temperature.maxValue,
          'Nhiệt độ cao hơn ngưỡng',
          'Nhiệt độ thấp hơn ngưỡng'
        );
      }

      if (thresholds?.humidity?.thresholdId != null) {
        await checkAndSendWarning(
          'humidity',
          humidity[0].value,
          thresholds.humidity.minValue,
          thresholds.humidity.maxValue,
          'Độ ẩm không khí cao hơn ngưỡng',
          'Độ ẩm không khí thấp hơn ngưỡng'
        );
      }

      if (thresholds?.soilMoisture?.thresholdId != null) {
        await checkAndSendWarning(
          'soilMoisture',
          soilMoisture[0].value,
          thresholds.soilMoisture.minValue,
          thresholds.soilMoisture.maxValue,
          'Độ ẩm đất cao hơn ngưỡng',
          'Độ ẩm đất thấp hơn ngưỡng'
        );
      }
    };

    sendWarnings();
  }, [temperature, humidity, soilMoisture, thresholds, token, showError, triggerNewWarning]);

  return { temperature, humidity, soilMoisture, thresholds };
};