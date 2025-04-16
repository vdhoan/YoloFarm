import { Line,Area, Column } from '@ant-design/plots';
import { useEffect, useState } from 'react';
// import { notification } from 'antd'
import './Statistics.css';
import { getHumidity, getSoilMoisture, getTemperature } from '../../services/Api';


export default function Statistics() {

    const [temperature, setTemperature] = useState([])
    const [humidity, setHumidity] = useState([])
    const [soilMoisture, setSoilMoisture] = useState([])
    const [timeOut, setTimeOut] = useState(false)

    setInterval(() => setTimeOut(!timeOut), 50000);

    useEffect(() => {
        const fetchTemperature = async () => {
            const response = await getTemperature();
            const res = await getHumidity()
            const responseSoilMoisture = await getSoilMoisture()
            // console.log(responseSoilMoisture)
            // console.log(res)
            setTemperature(response.data);
            setHumidity(res.data);
            setSoilMoisture(responseSoilMoisture.data);
        };

        fetchTemperature();
    }, [timeOut])
    const configTemperature = {
        data: temperature,
        xField: 'created_at',
        yField: 'value',
       
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
        smooth: true,
        colorField: '#29899af8',
        slider: {
            x: {
              values: [0.1, 0.2],
            },
          },
    };

    const configSoilMoisture = {
        data: soilMoisture,
        xField: 'created_at',
        yField: 'value',
        colorField: 'brown',
        smooth: true,
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
                                {Array.isArray(temperature) && temperature.length > 0 ? temperature[0].value : "Chưa có dữ liệu"}
                            </p>
                        </div>

                    </div>
                    <div className="card-thresholds">
                        <h3>Độ ẩm không khí</h3>
                        <img className='img-thresholds' src="https://th.bing.com/th?q=Humidity+Icon+No+Background&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247" alt="humidity" />
                        <div >
                            <p style={{ textAlign: "center" }}>
                                {Array.isArray(humidity) && humidity.length > 0 ? humidity[0].value : "Chưa có dữ liệu"}
                            </p>
                        </div>
                    </div>
                    <div className="card-thresholds">
                        <h3>Độ ẩm đất</h3>
                        <img className='img-thresholds' src="https://th.bing.com/th/id/OIP.3O5_-oCR6oCXl90RmBjxigHaHa?w=212&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="soil moisture" />
                        <div >
                            <p style={{ textAlign: "center" }}>
                                {Array.isArray(soilMoisture) && soilMoisture.length > 0 ? soilMoisture[0].value : "Chưa có dữ liệu"}
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
                    <Area {...configHumidity} />
                </div>
                <div className='item-chart'>
                    <h2 className="title-chart">Biểu đồ độ ẩm đất</h2>
                    <Line {...configSoilMoisture} />
                </div>
            </div>
        </div >
    );
}
