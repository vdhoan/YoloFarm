import { useEffect, useState } from "react";
import { Form, Button, Input, Popconfirm, Table, DatePicker, TimePicker, notification } from "antd";
import { FilterOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from "dayjs";


import { deleteWatering, getStartTime, getEndtTime, getWatering, postTimeEnd, postTimeStart, postWatering } from "../../services/Api";
import "./AutomaticWatering.css";

export default function AutomaticWatering() {
    const [form] = Form.useForm();
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const [changeData, setChangeData] = useState(false);
    const [nextStartTime, setNextStartTime] = useState(null);
    const [nextEndTime, setNextEndTime] = useState(null);

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
        </div>
    );
}