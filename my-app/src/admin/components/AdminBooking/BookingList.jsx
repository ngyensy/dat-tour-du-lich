import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = ({ onViewDetail }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State cho từ khóa tìm kiếm
  const [statusFilter, setStatusFilter] = useState(''); 

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:4000/v1/booking');
        console.log(response.data.$values);
        setBookings(response.data.$values);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa booking này?');
    if (!confirmDelete) return; // Hủy nếu không đồng ý xóa

    try {
      const response = await axios.delete(`http://localhost:4000/v1/booking/${id}`);
      if (response.status !== 200) {
        throw new Error('Không thể xóa booking.');
      }
      // Xóa booking thành công, cập nhật danh sách booking
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Sắp xếp theo thứ tự ưu tiên
  const sortPriority = {  
  "Chờ xác nhận": 1,
  "Đã xác nhận": 2,
  "Đã thanh toán": 3,
  "Đã Hủy Booking": 4,
};

// Lọc danh sách dựa trên từ khóa tìm kiếm và trạng thái
const filteredBookings = bookings
  .filter((booking) => {
    const idString = String(booking.id); // Chuyển id về chuỗi rõ ràng
    const phoneNumber = String(booking.guestPhoneNumber || ''); // Xử lý null phoneNumber
    return (
      (statusFilter === '' || booking.status === statusFilter) &&
      (idString.includes(searchTerm) || phoneNumber.includes(searchTerm))
    );
  })
  // Sắp xếp theo thứ tự ưu tiên dựa trên `sortPriority`
  .sort((a, b) => (sortPriority[a.status] || 5) - (sortPriority[b.status] || 5));

  
  

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Danh sách Booking</h2>

      <div className='flex space-x-10'>
      {/* Thanh tìm kiếm */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo mã booking hoặc số điện thoại"
          className="w-full px-4 py-2 mb-4 border rounded"
        />

      {/* Dropdown lọc trạng thái */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
        >
          <option value="">Tất cả Tour</option>
          <option value="Chờ xác nhận">Chờ xác nhận</option>
          <option value="Đã xác nhận">Đã xác nhận</option>
          <option value="Đã thanh toán">Đã thanh toán</option>
          <option value="Đã Hủy Booking">Đã Hủy Booking</option>
        </select>
      </div>
      {filteredBookings.length === 0 ? (
        <p className='text-center'>Không có Booking nào!!!</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border text-center">Mã Booking</th>
              <th className="py-2 px-4 border text-center">Tên Tour</th>
              <th className="py-2 px-4 border text-center">Tên Người Đặt</th>
              <th className="py-2 px-4 border text-center">Số điện thoại</th>
              <th className="py-2 px-4 border text-center">Ngày Đặt</th>
              <th className="py-2 px-4 border text-center">Trạng Thái</th>
              <th className="py-2 px-4 border text-center">Tổng Tiền</th>
              <th className="py-2 px-4 border text-center">Thao Tác</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="py-2 px-4 border text-center">{booking.id}</td>
                <td className="py-2 px-4 border text-center">{booking.tour?.name || 'N/A'}</td>
                <td className="py-2 px-4 border text-center">{booking.guestName}</td>
                <td className="py-2 px-4 border text-center">{booking.guestPhoneNumber}</td>
                <td className="py-2 px-4 border text-center">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border text-center">{booking.status}</td>
                <td className="py-2 px-4 border text-center">{booking.totalPrice}</td>
                <td className="py-2 px-4 border text-center">
                  <div className="flex justify-center space-x-3">
                    
                    {/* Icon View Detail */}
                    <button onClick={() => onViewDetail(booking)} className="text-blue-500 hover:text-blue-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path
                          fillRule="evenodd"
                          d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Icon Delete */}
                    <button onClick={() => handleDelete(booking.id)} className="text-red-500 hover:text-red-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingList;
