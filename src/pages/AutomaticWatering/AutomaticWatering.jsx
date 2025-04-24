import { useEffect, useState } from "react";
import { Form, Button, Input, Popconfirm, Table, DatePicker, TimePicker, notification, Modal, Card, List, Descriptions } from "antd";
import { FilterOutlined, DeleteOutlined, ScheduleOutlined, LineChartOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs from "dayjs";


import { deleteWatering, getStartTime, getEndtTime, getWatering, postTimeEnd, postTimeStart, postWatering, getIrrigationData } from "../../services/Api";
import "./AutomaticWatering.css";

export default function AutomaticWatering() {
    const [form] = Form.useForm();
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const [changeData, setChangeData] = useState(false);
    const [nextStartTime, setNextStartTime] = useState(null);
    const [nextEndTime, setNextEndTime] = useState(null);
    const [irrigationModalVisible, setIrrigationModalVisible] = useState(false);
    const [irrigationData, setIrrigationData] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateNextWatering = async (schedules) => {
        const now = dayjs();
    
        const futureTimes = schedules.flatMap(item =>
            item.wateringTimes?.startTimes.map((_, index) => ({
                start: dayjs(item.wateringTimes.startTimes[index].date, 'YYYY-MM-DD HH:mm'),
                end: dayjs(item.wateringTimes.endTimes[index].date, 'YYYY-MM-DD HH:mm'),
            }))
        ).filter(time => time.end.isAfter(now));
        console.log("futureTimes in updateNextWatering", futureTimes);
    
        if (futureTimes.length > 0) {
            const next = futureTimes.reduce((a, b) => a.start.isBefore(b.start) ? a : b);
            setNextStartTime(next.start);
            setNextEndTime(next.end);
    
            const timeUntilEnd = next.end.diff(now, 'millisecond');
            
            if (timeUntilEnd > 0) {
                setTimeout(() => {
                    updateNextWatering(schedules);
                }, timeUntilEnd);
            } else {
                updateNextWatering(schedules);
            }
            const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            try {
                    await delay(15000);
                    await postTimeStart(next.start.format("D-M-YYYY-HH-mm"));
                    await postTimeEnd(next.end.format("D-M-YYYY-HH-mm"));
                
                // console.log("next start  ", next.start.format("D-M-YYYY-HH-mm"));
                // console.log("next end time ", next.end.format("D-M-YYYY-HH-mm"));
            } catch (error) {
                console.error('Error posting times:', error);
                notification.error({
                    message: 'Lỗi',
                    description: 'Không thể cập nhật thời gian tưới!'
                });
            }
        } else {
            setNextStartTime(null);
            setNextEndTime(null);
        }
    };


   
    const renderNextWatering = () => {
        if (!nextStartTime || !nextEndTime) {
            return <div className="next-watering-box">Không có lịch tưới sắp tới</div>;
        }
        // console.log("render next watering ", nextStartTime)

        return (
            <div className="next-watering-box">
                <h3>Lịch tưới tiếp theo</h3>
                <p>
                    <strong>Bắt đầu:</strong> {nextStartTime.format('HH:mm [ngày] DD/MM/YYYY')}
                </p>
                <p>
                    <strong>Kết thúc:</strong> {nextEndTime.format('HH:mm [ngày] DD/MM/YYYY')}
                </p>
            </div>
        );
    };

    const getData = async () => {
        try {
            const response = await getWatering(token);
            const schedules = response.data;
            setData(schedules);
            // console.log("schedules in get data", schedules)
            updateNextWatering(schedules);
        } catch (err) {
            console.error("Lỗi tải dữ liệu tưới:", err);
        }
    };

    useEffect(() => {
        getData();
    }, [changeData]);

    const handleDelete = async (autoId) => {
        try {
            await deleteWatering(token, autoId);
            setChangeData(prev => !prev);
            // await deleteSchedule()
            notification.success({
                message: 'Thành công',
                description: 'Xoá lịch tưới thành công!'
            });
        } catch (error) {
            console.error("handleDelete erorr catch", error)
            notification.error({
                message: 'Lỗi',
                description: 'Không thể xoá lịch tưới!'
            });
        }
    };

    const handleSubmitForm = async (values) => {
        const newStart = dayjs(`${values.startDate.format('YYYY-MM-DD')} ${values.startTime.format('HH:mm')}`);
        const newEnd = dayjs(`${values.endDate.format('YYYY-MM-DD')} ${values.endTime.format('HH:mm')}`);

        const formPayload = {
            startDate: values.startDate.format('YYYY-MM-DD'),
            startTime: values.startTime.format('HH:mm'),
            endDate: values.endDate.format('YYYY-MM-DD'),
            endTime: values.endTime.format('HH:mm'),
        };

        try {
            const response = await postWatering(token, formPayload);
            console.log("response post watering create watering", response);
        
            if (response.success) {
                setChangeData(prev => !prev);
        
                if (!nextStartTime || newStart.isBefore(nextStartTime)) {
                    setNextStartTime(newStart);
                    setNextEndTime(newEnd);
                }
        
                notification.success({
                    message: 'Thành công',
                    description: 'Cập nhật lịch tưới thành công!'
                });
            } else {
                
                notification.error({
                    message: "Lỗi",
                    description: response.data?.error || "Lịch tưới không hợp lệ"
                });
            }
        } catch (error) {
           
            notification.error({
                message: "Có lỗi xảy ra",
                description: error?.response?.data?.error || "Lỗi không xác định"
            });
        }
        
    };

    const columns = [
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (date) => date ? dayjs(date, 'YYYY-MM-DD').format('DD/MM/YYYY') : '',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (date) => date ? dayjs(date, 'YYYY-MM-DD').format('DD/MM/YYYY') : '',
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (time) => time || '',
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (time) => time || '',
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

    const getDisabledTime = (selectedDate) => {
        const now = dayjs();
        const isToday = selectedDate && dayjs(selectedDate).isSame(now, 'day');

        if (!isToday) return {};
        return {
            disabledHours: () => [...Array(now.hour()).keys()],
            disabledMinutes: (selectedHour) =>
                selectedHour === now.hour() ? [...Array(now.minute()).keys()] : [],
        };
    };

    const formattedData = data.map(item => ({ ...item, key: item.autoId }));

    const fetchIrrigationData = async () => {
        setLoading(true);
        try {
            const response = await getIrrigationData(token);
            setIrrigationData(response.data);
            setIrrigationModalVisible(true);
        } catch (error) {
            notification.error({
                message: "Lỗi",
                description: "Không thể tải dữ liệu tưới"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="all-watering">
            <div className="watering">
                <div className='filter-watering'>
                    {renderNextWatering()}

                </div>
                <div className="watering-form">
                    <div className="watering-titile">
                        <h2>TẠO LỊCH TƯỚI TỰ ĐỘNG</h2>
                        <hr />
                    </div>

                    <Form layout="vertical" size="large" form={form} onFinish={handleSubmitForm}>
                        <div className="date">
                            <Form.Item
                                label="Ngày bắt đầu"
                                name="startDate"
                                rules={[{ required: true, message: "Vui lòng nhập ngày!" }]}
                            >
                                <DatePicker
                                    placeholder="Chọn ngày"
                                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Ngày kết thúc"
                                name="endDate"
                                rules={[{ required: true, message: "Vui lòng nhập ngày!" }]}
                            >
                                <DatePicker
                                    placeholder="Chọn ngày"
                                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                                />
                            </Form.Item>
                        </div>

                        <div className="time">
                            <Form.Item
                                label="Bắt đầu"
                                name="startTime"
                                rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}
                            >
                                <TimePicker
                                    placeholder="Chọn giờ"
                                    format="HH:mm"
                                    disabledTime={() => getDisabledTime(form.getFieldValue('startDate'))}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Kết thúc"
                                name="endTime"
                                rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}
                            >
                                <TimePicker
                                    placeholder="Chọn giờ"
                                    format="HH:mm"
                                    disabledTime={() => getDisabledTime(form.getFieldValue('endDate'))}
                                />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <div className='submit-watering'>
                                <Button type="primary" htmlType="submit">
                                    Tạo lịch
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className='history-watering'>
                <div className='table-watering'>
                    <h2>LỊCH SỬ TẠO TƯỚI NƯỚC TỰ ĐỘNG</h2>
                    <div className='filter-watering'>
                        {/* <DatePicker placeholder='Chọn ngày' />
                        <DatePicker picker='month' placeholder='Chọn tháng' /> */}
												
                        <Button 
                            type="primary" 
                            icon={<ScheduleOutlined />} 
                            onClick={fetchIrrigationData}
                            loading={loading}
														style={{marginLeft: 10, marginRight: 10}}
                        >
                            Quản lý tưới thông minh
                        </Button>
                    
                        {/* <Button type='primary'>Tìm kiếm <FilterOutlined /></Button> */}
                    </div>
                    <Table
                        columns={columns}
                        dataSource={formattedData}
                        pagination={{ pageSize: 10 }}
                        height={700}
                    />
                </div>
            </div>

            {/* Irrigation Modal */}
            <Modal
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Quản lý tưới thông minh</span>
                        <Button 
                            type="primary" 
                            icon={<ReloadOutlined />} 
                            size="small" 
                            loading={loading} 
                            onClick={fetchIrrigationData}
                        >
                            Cập nhật
                        </Button>
                    </div>
                }
                open={irrigationModalVisible}
                onCancel={() => setIrrigationModalVisible(false)}
                footer={null}
                width={800}
            >
                {irrigationData && (
                    <div>
                        <Card title="Thông tin hiện tại" style={{ marginBottom: 20 }}>
                            <Descriptions bordered>
                                <Descriptions.Item label="Độ ẩm đất hiện tại" span={3}>{irrigationData.current_moisture}%</Descriptions.Item>
                                <Descriptions.Item label="Ngày" span={3}>{dayjs().format('DD/MM/YYYY')}</Descriptions.Item>
                                {irrigationData.prediction && (
                                    <>
                                        <Descriptions.Item label="Nên tưới hôm nay" span={3}>
                                            {irrigationData.prediction.should_water ? 'Có' : 'Không'}
                                        </Descriptions.Item>
                                        {irrigationData.prediction.should_water && (
                                            <>
                                                <Descriptions.Item label="Thời lượng đề xuất" span={2}>
                                                    {irrigationData.prediction.recommended_duration} phút
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Thời gian bắt đầu">
                                                    {irrigationData.prediction.recommended_start_time}
                                                </Descriptions.Item>
                                            </>
                                        )}
                                    </>
                                )}
                            </Descriptions>
                        </Card>

                        {irrigationData.schedule && (
                            <Card title="Lịch tưới dự kiến" style={{ marginBottom: 20 }}>
                                <List
                                    dataSource={irrigationData.schedule}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Card title={`Ngày ${dayjs(item.date).format('DD/MM/YYYY')}`} style={{ width: '100%' }}>
                                                <p><strong>{item.shouldWater ? 'Nên tưới' : 'Không cần tưới'}</strong></p>
                                                {item.shouldWater && (
                                                    <p><strong>Thời lượng tưới:</strong> {item.duration} phút</p>
                                                )}
                                                <Descriptions title="Điều kiện thời tiết" bordered>
                                                    <Descriptions.Item label="Nhiệt độ">{item.weatherConditions.temperature}°C</Descriptions.Item>
                                                    <Descriptions.Item label="Độ ẩm">{item.weatherConditions.humidity}%</Descriptions.Item>
                                                    <Descriptions.Item label="Lượng mưa">{item.weatherConditions.precipitation} mm</Descriptions.Item>
                                                    <Descriptions.Item label="Tốc độ gió">{item.weatherConditions.windSpeed} m/s</Descriptions.Item>
                                                </Descriptions>
                                            </Card>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}