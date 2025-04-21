// import { NavLink } from "react-router-dom";
import { Form, Button, Input, Popconfirm } from "antd";
import "./AutomaticWatering.css";
import { TimePicker, DatePicker, Checkbox, Table, Pagination } from "antd";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { notification } from "antd";
import { FilterOutlined, DeleteOutlined } from '@ant-design/icons'
import { deleteWatering, getWatering, postWatering } from "../../services/Api";


export default function AutomaticWatering() {
    const [changeData, setChangeData] = useState(false);
    const [data, setData] = useState([])
    const token = localStorage.getItem("token")


    const columns = [
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (date) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (date) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'Thời gian kết đầu',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: 'Xóa lịch',
            key: 'delete',
            render: (_, record) => (
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa?"
                    onConfirm={() => handleDelete(record.autoId)}
                    okText="Có"
                    cancelText="Không"
                >
                    <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                </Popconfirm>
            ),
        }
    ];

    const handleDelete = async ( autoId) => {
        const tokend = localStorage.getItem("token")
        const response = await deleteWatering(tokend, autoId);
        console.log(response)
        setChangeData(!changeData)
        notification.success({
            message: 'Thành công',
            description: 'Xoá lịch tưới thành công!'
        })
    }
    useEffect(() => {
       
        const getData = async () => {

            const response = await getWatering(token);
            setData(response.data)
            // console.log(response.data)
        }

        getData();
    }, [changeData])

    // const onChange = (time, timeString) => {
    //     console.log(time, timeString);
    // };
    const handleSubmitForm = async (values) => {
        console.log(values);
        const formSunmit = {
            startDate: values.startDate.format('YYYY-MM-DD'), 
            startTime: values.startTime.format('HH:mm'),
            endDate: values.endDate.format('YYYY-MM-DD'),
            endTime: values.endTime.format('HH:mm'),
        }
        try{
            const response = await postWatering(token, formSunmit)
            setChangeData(!changeData)
            console.log("hi",response)
            notification.success({
                        message: 'Thành công',
                        description: 'Cập nhật lịch thành công!'
                    })
        } catch(error){
            notification.error({
                message: "Có lỗi xảy ra",
                description: error?.response?.data?.error || error.message || "Lỗi không xác định"
            });
        }
        
    }

    // const [checked, setChecked] = useState(false);
    // const onChangeActive = (e) => {
    //     setChecked(e.target.checked);
    //     console.log("Checkbox checked:", e.target.checked);
    // };
    const formattedData = data.map((item) => ({
        ...item,
        key: item.autoId,
    }));
    return (
        <div className="all-watering">

            <div className='history-watering'>
                <div className='filter-watering'>
                    <DatePicker placeholder='Chọn ngày' />
                    <DatePicker picker='month' placeholder='Chọn tháng' />
                    {/* <DatePicker picker='year' placeholder='Chọn năm' /> */}
                    <Button type='primary'>Tìm kiếm <FilterOutlined /></Button>
                </div>
                <div className='table-watering'>
                    <h2>LỊCH SỬ TẠO TƯỚI NƯỚC TỰ ĐỘNG</h2>
                    <Table
                        columns={columns}
                        dataSource={formattedData}
                        pagination={true}
                        scroll={{ y: 300 }}
                    />
                </div>
            </div>
            <div className="watering">
                <div className="watering-form">
                    <div className="watering-titile">
                        <h2 > TẠO LỊCH TƯỚI TỰ ĐỘNG </h2>
                        <hr />
                    </div>

                    <Form layout='vertical' size='large' onFinish={handleSubmitForm} >
                        <div className="date">
                            <Form.Item
                                label="Ngày bắt đầu"
                                name="startDate"
                                rules={[{ required: true, message: "Vui lòng nhập ngày!" }]}
                            >
                                <DatePicker placeholder="Chọn ngày"  />
                            </Form.Item>
                            <Form.Item
                                label="Ngày kết thúc"
                                name="endDate"
                                rules={[{ required: true, message: "Vui lòng nhập ngày!" }]}
                            >
                                <DatePicker placeholder="Chọn ngày"  />
                            </Form.Item>
                        </div>
                        <div className="time">
                            <Form.Item
                                label="Bắt đầu"
                                name="startTime"
                                rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}
                            >
                                <TimePicker placeholder="Chọn giờ" format={'HH:mm'} />
                            </Form.Item>

                            <Form.Item
                                label="Kết thúc"
                                name="endTime"
                                rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}
                            >
                                <TimePicker placeholder="Chọn giờ" format={'HH:mm'} />
                            </Form.Item>
                        </div>

                        {/* <Form.Item
                            name="active"
                        >
                            <Checkbox checked={checked} onChange={onChangeActive}>Lặp lại</Checkbox>
                        </Form.Item> */}
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
        </div>

    );
}