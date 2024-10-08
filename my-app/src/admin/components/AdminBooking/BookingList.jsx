import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = ({ onViewDetail }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Danh sách Booking</h2>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border text-center">Mã Booking</th>
              <th className="py-2 px-4 border text-center">Tên Tour</th>
              <th className="py-2 px-4 border text-center">Tên Người Đặt</th>
              <th className="py-2 px-4 border text-center">Ngày Đặt</th>
              <th className="py-2 px-4 border text-center">Trạng Thái</th>
              <th className="py-2 px-4 border text-center">Tổng Tiền</th>
              <th className="py-2 px-4 border text-center">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="py-2 px-4 border text-center">{booking.id}</td>
                <td className="py-2 px-4 border text-center">{booking.tour?.name || 'N/A'}</td>
                <td className="py-2 px-4 border text-center">{booking.guestName}</td>
                <td className="py-2 px-4 border text-center">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border text-center">{booking.status}</td>
                <td className="py-2 px-4 border text-center">{booking.totalPrice}</td>
                <td className="py-2 px-4 border text-center">
                  <button
                    className="bg-red-500 text-white px-3 py-1 ml-3 rounded hover:bg-red-600"
                    onClick={() => handleDelete(booking.id)}  // Gọi hàm handleDelete để xóa booking
                  >
                    Xóa
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 ml-3 rounded hover:bg-blue-600"
                    onClick={() => onViewDetail(booking)}  // Gọi hàm xử lý để hiển thị chi tiết
                  >
                    Chi Tiết
                  </button>
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
