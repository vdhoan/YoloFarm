import "./Warning.css"
import { Form, Button, Input } from "antd";
import { DatePicker, Select, Table } from "antd";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
// import { notification } from "antd";
import { FilterOutlined } from '@ant-design/icons'
import { getWarning } from "../../services/Api";

export default function Warning() {
    // const [changeData, setChangeData] = useState(false);
    const [data, setData] = useState([])
    const token = localStorage.getItem("token")


    const columns = [
        {
            title: 'Loại cảnh báo',
            dataIndex: 'sensorType',
            key: 'sensorType',
        },
        {
            title: 'Giá trị',
            dataIndex: 'currentValue',
            key: 'currentValue',
        },
        {
            title: 'Thời gian',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (date) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Lí do',
            dataIndex: 'message',
            key: 'message',
        }
    ];


    useEffect(() => {
        const getData = async () => {

            const response = await getWarning(token);
            setData(response.data)
        }

        getData();
    }, [token])


   
    return (
        <div className="all-watering">

            <div className='history-watering'>
                <div className='filter-watering'>
                    <DatePicker placeholder='Chọn ngày' />
                    <DatePicker picker='month' placeholder='Chọn tháng' />
                    <Button type='primary'>Tìm kiếm <FilterOutlined /></Button>
                </div>
                <div className='table-watering'>
                    <h2>LỊCH SỬ CẢNH BÁO</h2>
                    {/* <Table
                        columns={columns}
                        dataSource={formattedData}
                        pagination={true}
                        scroll={{ y: 300 }}
                    /> */}
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: false,
                        }}
                        rowKey={(record) => record.id}
                        className="history-table"
                    />
                </div>
            </div>
            {/* <div className="watering">
                <div className="watering-form">
                    <div className="watering-titile">
                        <h2 > TẠO CẢNH BÁO </h2>
                        <hr />
                    </div>

                    <Form layout='vertical' size='large' onFinish={handleSubmitForm} >
                        <Form.Item
                            label="Loại xét ngưỡng"
                            name="sensorType"
                            rules={[{ required: true, message: "Vui lòng chọn loại xét ngưỡng!" }]}
                        >
                            <Select
                                placeholder="Chọn loại xét ngưỡng"
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
                            label="Giá trị hiện tại"
                            name="currentValue"
                            rules={[
                                { required: true, message: "Vui lòng nhập giá trị hiện tại!" },
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
                            <Input placeholder="Nhập giá trị hiện tại" />
                        </Form.Item>
                        <Form.Item
                            label="Lí do"
                            name="message"
                            rules={[
                                { required: true, message: "Vui lòng nhập lí do!" },
                            ]}
                        >
                            <Input placeholder="Nhập lí do tạo cảnh báo" />
                        </Form.Item>

                        <Form.Item>
                            <div className='submit-watering'>
                                <Button type="primary" htmlType="submit" >
                                    Tạo cảnh báo
                                </Button>
                            </div>

                        </Form.Item>
                    </Form>
                </div>
            </div> */}
            {

            }
        </div>

    );
}

