// import { NavLink } from "react-router-dom";
import { Form, Button, Input } from "antd";
import "./AutomaticWatering.css";
import { TimePicker,DatePicker,Checkbox } from "antd";
// import dayjs from "dayjs";
// import { notification } from "antd";

export default function AutomaticWatering() {
    const onChange = (time, timeString) => {
        console.log(time, timeString);
    };
    const handleSubmitForm = (values) => {
        console.log(values);
       
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
        <div className="watering">
            <div className="watering-form">
                <div className="watering-titile">
                    <h2 > TẠO LỊCH TƯỚI NƯỚC TỰ ĐỘNG </h2>
                    <hr />
                </div>
                
                <Form layout='vertical' size='large' onFinish={handleSubmitForm} >
                    <div className="date">
                        <Form.Item
                            label="Ngày bắt đầu"
                            name="startDate"
                            rules={[{ required: true, message: "Vui lòng nhập ngày!" }]}
                        >
                            <DatePicker placeholder="Chọn ngày" onChange={onChange} />
                        </Form.Item>
                        <Form.Item
                            label="Ngày kết thúc"
                            name="endDate"
                            rules={[{ required: true, message: "Vui lòng nhập ngày!" }]}
                        >
                            <DatePicker placeholder="Chọn ngày" onChange={onChange} />
                        </Form.Item>
                    </div>
                   <div className="time">
                        <Form.Item
                            label="Bắt đầu"
                            name="startTime"
                            rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}
                        >
                        <TimePicker onChange={onChange} placeholder="Chọn giờ" format={'HH:mm'} />
                        </Form.Item>

                        <Form.Item
                            label="Kết thúc"
                            name="endTime"
                            rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}
                        >
                            <TimePicker onChange={onChange} placeholder="Chọn giờ" format={'HH:mm'} />
                        </Form.Item>
                   </div>
                    
                    <Form.Item
                        name="active"
                    >
                        <Checkbox onChange={onChange}>Lặp lại</Checkbox>
                    </Form.Item>

                    
                    <Form.Item>
                        <div className='submit-watering'>
                            <Button type="primary" htmlType="submit" >
                                Tạo lịch
                            </Button>
                        </div>

                    </Form.Item>
                </Form>
            </div>


        </div>
     );
}