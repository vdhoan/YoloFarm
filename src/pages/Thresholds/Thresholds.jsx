
import { NavLink } from 'react-router-dom';
import { Form, Button, Input, Select } from 'antd'
import { useEffect, useState } from 'react';
import { notification } from 'antd'
import './Thresholds.css';
import { deleteThresholds, getThresholds, postThresholds } from '../../services/Api';
import { useForm } from "antd/es/form/Form";

export default function Thresholds() {
    const token = localStorage.getItem("token")
    const [form] = useForm();
    const [thresholds, setThresholds] = useState({
        temperature: { minValue: 0, maxValue: 0 },
        humidity: { minValue: 0, maxValue: 0 },
        soilMoisture: { minValue: 0, maxValue: 0 }
    });
    const [changeData, setChangeData] = useState(false)

    useEffect(() => {
       
        const fetchThresholds = async () => {
                const response = await getThresholds(token);
                console.log("threshold",response.temperature)
                setThresholds(response);    
        };

        fetchThresholds();
    }, [changeData,token])


    const handleSubmitForm = async (values) => {

        const formattedValues = {
            sensorType: values.sensorType,
            minValue: Number(values.minValue),
            maxValue: Number(values.maxValue)
        };

        try {
            await postThresholds(token,formattedValues);

            setChangeData(!changeData);
            notification.success({
                message: "Thành công",
                description: "Cập nhật ngưỡng thành công!"
            });
            form.resetFields();

        } catch (error) {

            notification.error({
                message: "Có lỗi xảy ra",
                description: error?.response?.data?.error || error.message || "Lỗi không xác định"
            });
        }
    };


    // const onChange = (value) => {
    //     console.log(`selected ${value}`);
    // };
    const handleDelete = async (thresholdId) => {
        try{
            const res = await deleteThresholds(token,thresholdId)
            console.log("delete threshold",res)
            setChangeData(!changeData);
            notification.success({
                message: "Thành công",
                description: "Xóa ngưỡng thành công!"
            });
        }catch (error) {

            notification.error({
                message: "Có lỗi xảy ra",
                description: error?.response?.data?.error || error.message || "Lỗi không xác định"
            });
        }
       
    }
    return (
        <div className="container-thresholds">
            <div className="show-thresholds">
                <div className="card-thresholds">
                    <h3>Nhiệt độ</h3>
                    <img className='img-thresholds' src="https://static.vecteezy.com/system/resources/previews/019/860/394/non_2x/thermometer-icon-colorful-free-png.png" alt="temperature" />
                    <div >
                        {thresholds.temperature.thresholdId  ?
                         ( <div className='delete-cart'>
                                <p> {thresholds.temperature.minValue} C - {thresholds.temperature.maxValue} C  </p>
                                <Button type="primary" danger onClick={()=>handleDelete(thresholds.temperature.thresholdId)}>
                                    Xóa
                                </Button>
                            </div>
                        ):
                        <>
                            <p style={{ textAlign: "center" }}>Chưa thiết lập ngưỡng</p>
                        </>}

                    </div>

                </div>
                <div className="card-thresholds">
                    <h3>Độ ẩm không khí</h3>
                    <img className='img-thresholds' src="https://th.bing.com/th?q=Humidity+Icon+No+Background&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247" alt="humidity" />
                    <div >
                        {thresholds.humidity.thresholdId  ?
                         ( <div className='delete-cart'>
                                <p> {thresholds.humidity.minValue} % - {thresholds.humidity.maxValue} %  </p>
                                <Button type="primary" danger onClick={()=>handleDelete(thresholds.humidity.thresholdId)}>
                                    Xóa
                                </Button>
                            </div>
                        ):
                        <>
                            <p style={{ textAlign: "center" }}>Chưa thiết lập ngưỡng</p>
                        </>}

                    </div>
                </div>
                <div className="card-thresholds">
                    <h3>Độ ẩm đất</h3>
                    <img className='img-thresholds' src="https://th.bing.com/th/id/OIP.3O5_-oCR6oCXl90RmBjxigHaHa?w=212&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="soil moisture" />
                    <div >
                        {thresholds.soilMoisture.thresholdId  ?
                         ( <div className='delete-cart'>
                                <p> {thresholds.soilMoisture.minValue} % - {thresholds.soilMoisture.maxValue} %  </p>
                                <Button type="primary" danger onClick={()=>handleDelete(thresholds.soilMoisture.thresholdId)}>
                                    Xóa
                                </Button>
                            </div>
                        ):
                        <>
                            <p style={{ textAlign: "center" }}>Chưa thiết lập ngưỡng</p>
                        </>}

                    </div>
                </div>
            </div>

            <div className="thresholds">
                <div className="thresholds-form">
                    <div className="threshold-titile">
                        <h2 >Đặt lại thông số ngưỡng</h2>
                        <hr />
                    </div>

                   <Form  form={form}layout='vertical' size='large' onFinish={handleSubmitForm} >

                        <Form.Item
                            label="Loại xét ngưỡng"
                            name="sensorType"
                            rules={[{ required: true, message: "Vui lòng chọn loại xét ngưỡng!" }]}
                        >
                            <Select
                                placeholder="Chọn loại xét ngưỡng"
                                // onChange={onChange}
                                options={[
                                    {
                                        value: 'temperature',
                                        label: 'Nhiệt độ',
                                    },
                                    {
                                        value: 'soilMoisture',
                                        label: 'Độ ẩm đất',
                                    },
                                    {
                                        value: 'humidity',
                                        label: 'Độ ẩm không khí',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Giá trị cao nhất"
                            name="maxValue"
                            rules={[
                                { required: true, message: "Vui lòng nhập ngưỡng cao nhất!" },
                                {
                                    validator: (_, value) => {
                                        if (!value || isNaN(value)) {
                                            return Promise.reject(new Error("Giá trị phải là số!"));
                                        }
                                        const numValue = Number(value);
                                        if (numValue < 0 || numValue > 100) {
                                            return Promise.reject(new Error("Giá trị phải từ 0 đến 100!"));
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            <Input placeholder="Nhập ngưỡng cao nhất được phép" />
                        </Form.Item>

                        <Form.Item
                            label="Giá tri thấp nhất"
                            name="minValue"
                            rules={[
                                { required: true, message: "Vui lòng nhập ngưỡng thấp nhất!" },
                                {
                                    validator: (_, value) => {
                                        if (!value || isNaN(value)) {
                                            return Promise.reject(new Error("Giá trị phải là số!"));
                                        }
                                        const numValue = Number(value);
                                        if (numValue < 0 || numValue > 100) {
                                            return Promise.reject(new Error("Giá trị phải từ 0 đến 100!"));
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            <Input placeholder="Nhập ngưỡng thấp nhất được phép" />
                        </Form.Item>



                        <Form.Item>

                            <div className='submit-thresholds'>
                                <Button type="primary" htmlType="submit" >
                                    Cập nhật
                                </Button>
                                <button className="link-history" >
                                    <NavLink to="/history">Lịch sử  </NavLink>
                                </button>
                            </div>

                        </Form.Item>
                    </Form>
                </div>


            </div>
        </div >
    );
}