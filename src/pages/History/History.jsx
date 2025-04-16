import { Table, DatePicker, Pagination, Button} from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import "./History.css"

const columns = [
    {
        title: 'Ngày',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Thời gian hoạt động',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Người thực hiện',
        dataIndex: 'user',
        key: 'user',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
        key: 'action',
    }
];

export default function History() {
    
    return (
        <div className='history'>
            <div className='filter-history'>
                <DatePicker placeholder='Chọn ngày' />
                <DatePicker picker='month' placeholder='Chọn tháng' />
                <DatePicker picker='year' placeholder='Chọn năm' />
                <Button type='primary'>Tìm kiếm <FilterOutlined /></Button>
            </div>
            <div className='table-history'>
                <h2>LỊCH SỬ HOẠT ĐỘNG</h2>
                <Table
                    columns={columns}
                    dataSource={[]}
                    pagination={true}
                    scroll={{ y: 240 }}
                />

                <Pagination className='pagination-history'
                    defaultCurrent={1}
                    total={100}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
}