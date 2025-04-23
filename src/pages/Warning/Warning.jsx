import "./Warning.css";
import { Button, DatePicker, Table } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { FilterOutlined } from '@ant-design/icons';
import { getWarning } from "../../services/Api";
import { useNotification } from "../../components/Context/WarningContext";

export default function Warning() {
  const { newWarningTrigger } = useNotification();
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const token = localStorage.getItem("token");

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
      title: 'Ngày tháng',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (date) => dayjs(date).format('HH:mm:ss'),
    },
    {
      title: 'Lí do',
      dataIndex: 'message',
      key: 'message',
    },
  ];

  const fetchData = async () => {
    try {
      const params = {};
      if (selectedDate) {
        params.date = dayjs(selectedDate).format('YYYY-MM-DD');
      }
      if (selectedMonth) {
        params.month = dayjs(selectedMonth).format('YYYY-MM');
      }
      const response = await getWarning(token, params); 
      setData(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu cảnh báo:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, newWarningTrigger, selectedDate, selectedMonth]);

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className="all-watering">
      <div className='history-watering'>
        <div className='filter-watering'>
          <DatePicker
            placeholder='Chọn ngày'
            onChange={(date) => setSelectedDate(date)}
          />
          <DatePicker
            picker='month'
            placeholder='Chọn tháng'
            onChange={(date) => setSelectedMonth(date)}
          />
          <Button type='primary' onClick={handleSearch}>
            Tìm kiếm <FilterOutlined />
          </Button>
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
          />
        </div>
      </div>
    </div>
  );
}