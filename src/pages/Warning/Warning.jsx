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
                    <Table
                        columns={columns}
                        dataSource={data.map((item, index) => ({ ...item, key: index }))}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: false,
                        }}
                        // className="history-table"
                    />

                </div>
            </div>

        </div>

    );
}

