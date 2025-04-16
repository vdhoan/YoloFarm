import { EditOutlined } from "@ant-design/icons";
import "./Divice.css";

export default function Divice() {
    return (
        <div className="device-container">
            <h1 className="device-title">Danh sách thiết bị</h1>
            <table className="device-table">
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
                        <td>Trung tâm điều khiển</td>
                        <td>Tủ điện</td>
                        <td>Hoạt động</td>
                        <td><EditOutlined className="edit-icon" /></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>S001</td>
                        <td>Cảm biến đất</td>
                        <td>Đo độ ẩm đất</td>
                        <td>Khu vườn</td>
                        <td>Hoạt động</td>
                        <td><EditOutlined className="edit-icon" /></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>S003</td>
                        <td>Cảm biến không khí</td>
                        <td>Đo độ ẩm không khí</td>
                        <td>Khu vườn</td>
                        <td>Hoạt động</td>
                        <td><EditOutlined className="edit-icon" /></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>P003</td>
                        <td>Máy bơm</td>
                        <td>Tưới cây</td>
                        <td>Khu vườn</td>
                        <td>Hoạt động</td>
                        <td><EditOutlined className="edit-icon" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
