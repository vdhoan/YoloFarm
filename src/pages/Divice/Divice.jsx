import {EditOutlined } from  "@ant-design/icons"

export default function Divice() {
    return (
        <>
            <h1 className="text-center block p-[10] m-lg">Danh sách thiết bị</h1>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên thiết bị</th>
                        <th>Loại thiết bị</th>
                        <th>Chức năng</th>
                        <th>Vị trí</th>
                        <th>Trạng Thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>YB001</td>
                        <td>Yolo:bit</td>
                        <td>Trung tâm điều kiển</td>
                        <td>Tủ điện</td>
                        <td>Hoạt động</td>
                        <td><EditOutlined /></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>S001</td>
                        <td>Cảm biến đất</td>
                        <td>Đo độ ẩm đất</td>
                        <td>Khu vườn</td>
                        <td>Hoạt động</td>
                        <td><EditOutlined /></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>S003</td>
                        <td>Cảm biến không khí</td>
                        <td>Đo độ ẩm không khí</td>
                        <td>Khu vườn</td>
                        <td>Hoạt động</td>
                        <td><EditOutlined /></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>P003</td>
                        <td>Máy bơm</td>
                        <td>Tưới cây</td>
                        <td>Khu vườn</td>
                        <td>Hoạt động</td>
                        <td><EditOutlined /></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}