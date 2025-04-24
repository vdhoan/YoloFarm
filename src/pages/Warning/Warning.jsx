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
  const [filteredData, setFilteredData] = useState([]); 
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null); 
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
      const response = await getWarning(token);
      setData(response.data);
      setFilteredData(response.data); 
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu cảnh báo:', error);
    }
  };

  
  useEffect(() => {
    fetchData();
  }, [token, newWarningTrigger]);

 
  const handleSearch = () => {
    if (!startDate && !endDate) {
      setFilteredData(data); 
      return;
    }

    const filtered = data.filter((item) => {
      const itemDate = dayjs(item.timestamp);
      const start = startDate ? dayjs(startDate).startOf('day') : null;
      const end = endDate ? dayjs(endDate).endOf('day') : null;

     
      if (start && end) {
        return itemDate.isAfter(start) && itemDate.isBefore(end);
      }
      if (start) {
        return itemDate.isSame(start, 'day') || itemDate.isAfter(start);
      }
      if (end) {
        return itemDate.isSame(end, 'day') || itemDate.isBefore(end);
      }
      return true;
    });

    setFilteredData(filtered); 
  };

  
  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setFilteredData(data); 
  };

 
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div className="all-watering">
      <div className='history-watering'>
        <div className='filter-watering'>
          <DatePicker
            placeholder='Chọn ngày bắt đầu'
            onChange={handleStartDateChange}
            value={startDate}
            format="DD/MM/YYYY"
          />
          <DatePicker
            placeholder='Chọn ngày kết thúc'
            onChange={handleEndDateChange}
            value={endDate}
            format="DD/MM/YYYY"
          />
          <Button type='primary' onClick={handleSearch}>
            Tìm kiếm <FilterOutlined />
          </Button>
          <Button onClick={handleClearFilter}>Xóa bộ lọc</Button>
        </div>
        <div className='table-watering'>
          <h2>LỊCH SỬ CẢNH BÁO</h2>
          <Table
            columns={columns}
            dataSource={filteredData.map((item, index) => ({ ...item, key: index }))}
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