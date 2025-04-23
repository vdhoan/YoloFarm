import { useEffect, useState } from "react";
import { Form, Button, Input, Popconfirm, Table, DatePicker, TimePicker, notification, Modal, Card, List, Descriptions } from "antd";
import { FilterOutlined, DeleteOutlined, ScheduleOutlined, LineChartOutlined } from '@ant-design/icons';
import dayjs from "dayjs";


import { deleteWatering, getStartTime, getEndtTime, getWatering, postTimeEnd, postTimeStart, postWatering, getIrrigationSchedule, getIrrigationPrediction } from "../../services/Api";
import "./AutomaticWatering.css";

export default function AutomaticWatering() {
    const [form] = Form.useForm();
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const [changeData, setChangeData] = useState(false);
    const [nextStartTime, setNextStartTime] = useState(null);
    const [nextEndTime, setNextEndTime] = useState(null);
    const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
    const [predictionModalVisible, setPredictionModalVisible] = useState(false);
    const [scheduleData, setScheduleData] = useState(null);
    const [predictionData, setPredictionData] = useState(null);
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
                }, timeUntilEnd+10000);
            } else {
                updateNextWatering(schedules);
            }
    
            try {
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
            const response =await postWatering(token, formPayload);
            setChangeData(prev => !prev);
            console.log("response post watering create watering", response.status)

            if (!nextStartTime || newStart.isBefore(nextStartTime)) {
                setNextStartTime(newStart);
                setNextEndTime(newEnd);
            }
            if(response.success){
                notification.success({
                    message: 'Thành công',
                    description: 'Cập nhật lịch tưới thành công!'
                });
            }
            if(response.status !== 200){
                notification.error({
                    message:"Lỗi",
                    description: response.data.error || "Lịch tưới không hợp lệ"
                })
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

    const fetchIrrigationSchedule = async () => {
        setLoading(true);
        try {
            const response = await getIrrigationSchedule(token);
            setScheduleData(response.data);
            setScheduleModalVisible(true);
        } catch (error) {
            notification.error({
                message: "Lỗi",
                description: "Không thể tải dữ liệu lịch tưới dự kiến"
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchIrrigationPrediction = async () => {
        setLoading(true);
        try {
            const response = await getIrrigationPrediction(token);
            setPredictionData(response.data);
            setPredictionModalVisible(true);
        } catch (error) {
            notification.error({
                message: "Lỗi",
                description: "Không thể tải dữ liệu dự đoán tưới"
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
                        <DatePicker placeholder='Chọn ngày' />
                        <DatePicker picker='month' placeholder='Chọn tháng' />
												
                        <Button 
                            type="primary" 
                            icon={<ScheduleOutlined />} 
                            onClick={fetchIrrigationSchedule}
                            loading={loading}
                            style={{ marginRight: '10px', marginLeft: '10px' }}
                        >
                            Lịch tưới dự kiến
                        </Button>
                        <Button 
                            type="primary" 
                            icon={<LineChartOutlined />} 
                            onClick={fetchIrrigationPrediction}
                            loading={loading}
														style={{ marginRight: '10px' }}
                        >
                            Dự đoán ngày hôm nay
                        </Button>
                    
                        <Button type='primary'>Tìm kiếm <FilterOutlined /></Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={formattedData}
                        pagination={{ pageSize: 10 }}
                        height={700}
                    />
                </div>
            </div>

            {/* Schedule Modal */}
            <Modal
                title="Lịch tưới dự kiến"
                open={scheduleModalVisible}
                onCancel={() => setScheduleModalVisible(false)}
                footer={null}
                width={800}
            >
                {scheduleData && (
                    <div>
                        <p><strong>Độ ẩm đất hiện tại:</strong> {scheduleData.current_moisture}%</p>
                        <List
                            dataSource={scheduleData.schedule}
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
                    </div>
                )}
            </Modal>

            {/* Prediction Modal */}
            <Modal
                title="Dự đoán tưới ngày hôm nay"
                open={predictionModalVisible}
                onCancel={() => setPredictionModalVisible(false)}
                footer={null}
                width={700}
            >
                {predictionData && (
                    <div>
                        <Card title="Điều kiện hiện tại" style={{ marginBottom: 20 }}>
                            <Descriptions bordered>
                                <Descriptions.Item label="Ngày" span={3}>{dayjs(predictionData.current_conditions.date).format('DD/MM/YYYY')}</Descriptions.Item>
                                <Descriptions.Item label="Độ ẩm đất">{predictionData.current_conditions.soil_moisture}%</Descriptions.Item>
                                <Descriptions.Item label="Nhiệt độ">{predictionData.current_conditions.temperature}°C</Descriptions.Item>
                                <Descriptions.Item label="Độ ẩm không khí">{predictionData.current_conditions.humidity}%</Descriptions.Item>
                                <Descriptions.Item label="Lượng mưa">{predictionData.current_conditions.precipitation} mm</Descriptions.Item>
                                <Descriptions.Item label="Tốc độ gió" span={2}>{predictionData.current_conditions.wind_speed} m/s</Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <Card title="Khuyến nghị tưới">
                            <p><strong>{predictionData.prediction.should_water ? 'Nên tưới hôm nay' : 'Không cần tưới hôm nay'}</strong></p>
                            {predictionData.prediction.should_water && (
                                <>
                                    <p><strong>Thời lượng đề xuất:</strong> {predictionData.prediction.recommended_duration} phút</p>
                                    <p><strong>Thời gian bắt đầu đề xuất:</strong> {predictionData.prediction.recommended_start_time}</p>
                                </>
                            )}
                        </Card>
                    </div>
                )}
            </Modal>
        </div>
    );
}