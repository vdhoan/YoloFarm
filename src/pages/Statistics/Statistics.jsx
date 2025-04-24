import { Line,Area, Column } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import './Statistics.css';
import { getHumidity, getSoilMoisture, getTemperature, postWarning, getThresholds } from '../../services/Api';
// import { toast } from 'react-toastify';

export default function Statistics() {
    const token = localStorage.getItem("token")
    const [temperature, setTemperature] = useState([])
    const [humidity, setHumidity] = useState([])
    const [soilMoisture, setSoilMoisture] = useState([])
    const [temperNow, setTemperNow] = useState([])
    const [humiNow, setHumiNow] = useState([])
    const [soilMoisNow, setSoilMoiNow] = useState([])
   const [timeOut, setTimeOut] = useState(false)
    // const [thresholds,setThresholds] = useState(null)
   
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOut((prev) => !prev);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

	const parseAndSort = (data) => {
		return data
			.map(item => ({
				...item,
				value: Number(item.value), 
				created_at: new Date(item.created_at), 
			}))
			.sort((a, b) => a.created_at - b.created_at); 
	};

useEffect(() => {

    const fetchData = async () => {
    
      try {
        //const thresholdsResponse = await getThresholds(token);
        const temperatureResponse = await getTemperature();
        const humidityResponse = await getHumidity();
        const soilMoistureResponse = await getSoilMoisture();
  
        //setThresholds(thresholdsResponse);
				setTemperature(parseAndSort(temperatureResponse.data));
				setHumidity(parseAndSort(humidityResponse.data));
				setSoilMoisture(parseAndSort(soilMoistureResponse.data));
        setTemperNow(temperatureResponse.data);
				setHumiNow(humidityResponse.data);
				setSoilMoiNow(soilMoistureResponse.data);
       // console.log("threshold",thresholdsResponse)
        console.log("temperature",temperatureResponse.data)
        console.log("humidity",humidityResponse.data)
        console.log("soilMoisture",soilMoistureResponse.data)


      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } 
    };
  
    fetchData();
  }, [ token,timeOut]);
  
  // useEffect(() => {
  //   const sendWarnings = async () => {
  //     if (
  //       temperature?.[0]?.value != null &&
  //       humidity?.[0]?.value != null &&
  //       soilMoisture?.[0]?.value != null &&
  //       thresholds?.temperature != null &&
  //       thresholds?.humidity!= null &&
  //       thresholds?.soilMoisture != null
  //     ) {
  //       // Cảnh báo nhiệt độ
  //       console.log("vao if")
  //       const tempVal = temperature[0].value;
  //       const tempMin = thresholds.temperature.minValue;
  //       const tempMax = thresholds.temperature.maxValue;
  
  //       if (tempVal > tempMax) {
  //         const res = await postWarning(token, {
  //           sensorType: "temperature",
  //           currentValue: Number(tempVal),
  //           message: "Nhiệt độ cao hơn ngưỡng",
  //         });
  //         toast.error("Nhiệt độ cao hơn ngưỡng")
  //         console.log(res);
  //       } else if (tempVal < tempMin) {
  //         const res = await postWarning(token, {
  //           sensorType: "temperature",
  //           currentValue: Number(tempVal),
  //           message: "Nhiệt độ thấp hơn ngưỡng",
  //         });
  //         toast.error("Nhiệt độ thấp hơn ngưỡng")
  //         console.log(res);
  //       }
  
  //       // Cảnh báo độ ẩm
  //       const humVal = humidity[0].value;
  //       const humMin = thresholds.humidity.minValue;
  //       const humMax = thresholds.humidity.maxValue;
  
  //       if (humVal > humMax) {
  //         const res = await postWarning(token, {
  //           sensorType: "humidity",
  //           currentValue: Number(humVal),
  //           message: "Độ ẩm không khí cao hơn ngưỡng",
  //         });
  //         toast.error("Độ ẩm không khí cao hơn ngưỡng")
  //         console.log(res);
  //       } else if (humVal < humMin) {
  //         const res = await postWarning(token, {
  //           sensorType: "humidity",
  //           currentValue: Number(humVal),
  //           message: "Độ ẩm không khí thấp hơn ngưỡng",
  //         });
  //         toast.error("Độ ẩm không khí thấp hơn ngưỡng")
  //         console.log(res);
  //       }
  
  //       const soilVal = soilMoisture[0].value;
  //       const soilMin = thresholds.soilMoisture.minValue;
  //       const soilMax = thresholds.soilMoisture.maxValue;
  
  //       if (soilVal > soilMax) {
  //         const res = await postWarning(token, {
  //           sensorType: "soilMoisture",
  //           currentValue: Number(soilVal),
  //           message: "Độ ẩm đất cao hơn ngưỡng",
  //         });
  //         toast.error("Độ ẩm đất cao hơn ngưỡng")
  //         console.log(res);
  //       } else if (soilVal < soilMin) {
  //         const res = await postWarning(token, {
  //           sensorType: "soilMoisture",
  //           currentValue: Number(soilVal),
  //           message: "Độ ẩm đất thấp hơn ngưỡng",
  //         });
  //         toast.error("Độ ẩm đất thấp hơn ngưỡng")
  //         console.log(res);
  //       }
  //     }
  //   };
  
  //   sendWarnings();
  // }, [temperature, humidity, soilMoisture, thresholds, token]);
      
    const configTemperature = {
        data: temperature,
        xField: 'created_at',
        yField: 'value',
				shape: 'smooth',
        colorField: 'red',
        style: {
            lineWidth: 2,
          },
          slider: {
            x: {
              values: [0.1, 0.2],
            },
          },     
    };

    const configHumidity = {
        data: humidity,
        xField: 'created_at',
        yField: 'value',
        shape: 'smooth',
        color: '#29899af8',
				style: {
					fill: 'linear-gradient(-90deg, white 0%, lightblue 100%)',
				},
				line: {
					shape: 'smooth',
					style: {
						stroke: '#2596be',
						strokeWidth: 3,
					},
				},
		point: {
			size: 5,
			shape: 'circle',
			style: {
					fill: 'white',
					stroke: '#29899af8',
					lineWidth: 2,
			},
	},
	xAxis: {
		tickCount: 5,
		grid: {
				line: {
						style: {
								stroke: '#eee',
								lineWidth: 1,
								lineDash: [4, 4],
						},
				},
		},
},

yAxis: {
		label: {
				formatter: (v) => `${v}%`,
		},
		min: 30,
		max: 70,
		range: [0, 1],
		nice: true,
		grid: {
				line: {
						style: {
								stroke: '#eee',
						},
				},
		},
},

        slider: {
            x: {
              values: [0.1, 0.2],
            }
          },
    };

    const configSoilMoisture = {
        data: soilMoisture,
        xField: 'created_at',
        yField: 'value',
        colorField: 'brown',
        shape: 'smooth',
				
        slider: {
            x: {
              values: [0.1, 0.2],
            },
          },
          style: {
            lineWidth: 2,
          },
					
					
    };
    return (
        <div className="wrapper-statistics">
            <div className='statistics'>
                <h2 >Giá trị hiện tại của thiết bị</h2>
                <div className="show-thresholds">
                    <div className="card-thresholds">
                        <h3>Nhiệt độ</h3>
                        <img className='img-thresholds' src="https://static.vecteezy.com/system/resources/previews/019/860/394/non_2x/thermometer-icon-colorful-free-png.png" alt="temperature" />
                        <div className='show-information'>
                            <p >
                                {Array.isArray(temperNow) && temperNow.length > 0 ? temperNow[0].value : "Chưa có dữ liệu"}
                            </p>
                        </div>

                    </div>
                    <div className="card-thresholds">
                        <h3>Độ ẩm không khí</h3>
                        <img className='img-thresholds' src="https://th.bing.com/th?q=Humidity+Icon+No+Background&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247" alt="humidity" />
                        <div >
                            <p style={{ textAlign: "center" }}>
                                {Array.isArray(humiNow) && humiNow.length > 0 ? humiNow[0].value : "Chưa có dữ liệu"}
                            </p>
                        </div>
                    </div>
                    <div className="card-thresholds">
                        <h3>Độ ẩm đất</h3>
                        <img className='img-thresholds' src="https://th.bing.com/th/id/OIP.3O5_-oCR6oCXl90RmBjxigHaHa?w=212&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="soil moisture" />
                        <div >
                            <p style={{ textAlign: "center" }}>
                                {Array.isArray(soilMoisNow) && soilMoisNow.length > 0 ? soilMoisNow[0].value : "Chưa có dữ liệu"}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <div className='charts'>
                <div className='item-chart'>
                    <h2 className="title-chart">Biểu đồ nhiệt độ</h2>
                    <Line {...configTemperature} />
                </div>
                <div className='item-chart'>
                    <h2 className="title-chart">Biểu đồ độ ẩm không khí</h2>
                    <Line {...configHumidity}
									 />
                </div>
                <div className='item-chart'>
                    <h2 className="title-chart">Biểu đồ độ ẩm đất</h2>
                    <Line {...configSoilMoisture} />
                </div>
            </div>
        </div >
    );
}
