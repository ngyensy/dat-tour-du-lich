import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation

const TourSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({ startDate: '', tourId: '' }); // Bỏ 'status'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const apiBaseUrl = 'http://localhost:4000/v1/Tourschedule';

  // Lấy tourId từ query string trong URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tourIdFromUrl = queryParams.get('tourId'); // Lấy giá trị 'tourId' từ URL

  // Fetch danh sách lịch trình từ API
  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiBaseUrl);
      setSchedules(response.data.$values);
    } catch (err) {
      setError('Không thể tải dữ liệu lịch trình.');
    } finally {
      setLoading(false);
    }
  };

  // Thêm lịch trình mới
  const addSchedule = async () => {
    if (!newSchedule.startDate) return alert('Vui lòng chọn ngày khởi hành!');
    if (!newSchedule.tourId) return alert('Vui lòng chọn Tour ID!'); // Kiểm tra xem Tour ID có tồn tại chưa

    try {
      const response = await axios.post(apiBaseUrl, {
        startDate: newSchedule.startDate,
        tourId: newSchedule.tourId,
      });
      setSchedules([...schedules, response.data]);
      setNewSchedule({ startDate: '', tourId: tourIdFromUrl || '' }); // Gửi kèm Tour ID vào request
    } catch (err) {
      setError('Không thể thêm lịch trình.');
    }
  };

  // Xóa lịch trình
  const removeSchedule = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/${id}`);
      setSchedules(schedules.filter((schedule) => schedule.id !== id));
    } catch (err) {
      setError('Không thể xóa lịch trình.');
    }
  };

  // Cập nhật thanh tìm kiếm và thực hiện lọc khi tourId thay đổi
  useEffect(() => {
    if (tourIdFromUrl) {
      setSearchTerm(tourIdFromUrl); // Tự động điền tourId từ URL vào thanh tìm kiếm
      setNewSchedule((prev) => ({ ...prev, tourId: tourIdFromUrl })); // Cập nhật Tour ID trong trạng thái
    }
    fetchSchedules(); // Gọi API để tải dữ liệu lịch trình
  }, [tourIdFromUrl]); // Thực hiện khi tourId từ URL thay đổi

  // Lọc lịch trình theo searchTerm (tourId)
  const filteredSchedules = schedules.filter((schedule) =>
  schedule.tourId && schedule.tourId.toString().includes(searchTerm) // Kiểm tra tourId có tồn tại
);

  // Hàm định dạng ngày tháng năm
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN'); // Định dạng ngày theo kiểu Việt Nam
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Quản lý Ngày khởi hành</h2>

      {/* Thanh tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo Tour ID..."
          value={searchTerm}  // Giá trị được điền tự động từ URL
          onChange={(e) => setSearchTerm(e.target.value)}  // Cập nhật searchTerm khi người dùng thay đổi
          className="border p-2 rounded-md"
        />
      </div>

      {/* Hiển thị lỗi */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Hiển thị loading */}
      {loading ? (
        <div>Đang tải dữ liệu...</div>
      ) : (
        <>
          {/* Form thêm ngày khởi hành */}
          <div className="mb-4">
            <input
              type="date"
              value={newSchedule.startDate}
              onChange={(e) => setNewSchedule({ ...newSchedule, startDate: e.target.value })}
              className="border p-2 rounded-md mr-2"
            />
            <button
              onClick={addSchedule}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Thêm
            </button>
          </div>

          {/* Danh sách lịch trình - Lọc theo searchTerm */}
          <ul className="divide-y divide-gray-200">
            {filteredSchedules.map((schedule) => (
              <li key={schedule.id} className="flex justify-between items-center py-2">
                <div>
                  <span className="font-bold">{formatDate(schedule.startDate)}</span> -{' '}
                  <span className="font-bold">{formatDate(schedule.endDate)}</span>
                </div>
                <button
                  onClick={() => removeSchedule(schedule.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TourSchedule;
