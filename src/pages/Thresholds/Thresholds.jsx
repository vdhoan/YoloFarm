
import { NavLink } from 'react-router-dom';
import {Form,Button, Input } from 'antd'
// import {message, notification} from 'antd'
import './Thresholds.css';


export default function Thresholds() {
    const handleSubmitForm = (values) => {
        console.log(values);
        const {humidity, soilMoisture, temperature} = values;
        console.log(humidity, soilMoisture, temperature);
        // if(humidity < 0 || humidity > 100 || soilMoisture < 0 || soilMoisture > 100 || temperature < 0 || temperature > 100){
        //     notification.error({
        //         message: 'Lỗi',
        //         description: 'Vui lòng nhập đúng định dạng thông số!'
        //     })
        // }else{
        //     notification.success({
        //         message: 'Thành công',
        //         description: 'Cập nhật ngưỡng thành công!'
        //     })
        // }
    }               
    return (
        <div className="thresholds">
            <div className="thresholds-form">
                <div className="threshold-titile">
                    <h2 > NGƯỠNG THÔNG SỐ BÌNH THƯỜNG </h2>
                    <hr />
                </div>
                
                <Form layout='vertical' size='large' onFinish={handleSubmitForm} >

                    <Form.Item
                        label="Độ ẩm không khí"
                        name="humidity"
                        rules={[{ required: true, message: "Vui lòng nhập độ ẩm!" }]}
                    >
                        <Input  placeholder="Nhập khoảng độ ẩm cho phép" />
                    </Form.Item>

                    <Form.Item
                        label="Độ ẩm đất"
                        name="soilMoisture"
                        rules={[{ required: true, message: "Vui lòng nhập độ ẩm đất!" }]}
                    >
                        <Input placeholder="Nhập khoảng độ ẩm đất cho phép" />
                    </Form.Item>

                    <Form.Item
                        label="Nhiệt độ"
                        name="temperature"
                        rules={[{ required: true, message: "Vui lòng nhập nhiệt độ!" }]}
                    >
                        <Input placeholder="Nhập khoảng nhiệt độ cho phép" />
                    </Form.Item>
                    <Form.Item
                        label="Chú ý"
                        name="note"
                    >
                        <Input disabled placeholder="Thông số bạn nhập dùng để đưa ra cảnh báo khi vượt ngưỡng."/>  
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
    );
}