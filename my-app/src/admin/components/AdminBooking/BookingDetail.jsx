import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateBookingForm from './BookingUpdate';

const BookingDetail = ({ booking, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bookingData, setBookingData] = useState(booking);

  useEffect(() => {
    setBookingData(booking);
  }, [booking]);

  const calculateTotalPrice = (adults, children) => {
    const adultTotal = adults * (bookingData.tour?.price || 0);
    const childTotal = children * (bookingData.tour?.childPrice || 0);
    return adultTotal + childTotal;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdateBooking = async (updatedBooking) => {
    const totalPrice = calculateTotalPrice(updatedBooking.numberOfAdults, updatedBooking.numberOfChildren);

    const finalBooking = {
      ...updatedBooking,
      totalPrice: totalPrice
    };

    try {
      await axios.put(`http://localhost:4000/v1/booking/${bookingData.id}`, finalBooking);
      alert('Cập nhật thành công!');

      // Lấy lại dữ liệu booking mới sau khi cập nhật
      const response = await axios.get(`http://localhost:4000/v1/booking/${bookingData.id}`);
      setBookingData(response.data);

      setIsEditing(false);
    } catch (error) {
      console.error('Lỗi khi cập nhật booking:', error);
      alert('Cập nhật thất bại.');
    }
  };

  if (isEditing) {
    return <UpdateBookingForm booking={bookingData} onUpdate={handleUpdateBooking} onCancel={handleCancel} />;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Chi tiết Booking</h2>
      <div className="p-4 border border-gray-300 rounded shadow-md">
        <div className="flex">
          {/* Thông tin Booking bên trái */}
          <div className="w-1/2 pr-4">
            <h3 className="text-2xl font-bold mb-2">Thông tin Booking</h3>
            <div className="mb-2">
              <strong>Mã Booking:</strong> {bookingData.id}
            </div>
            <div className="mb-2">
              <strong>Tên Người Đặt:</strong> {bookingData.guestName}
            </div>
            <div className="mb-2">
              <strong>Ngày Đặt:</strong> {new Date(bookingData.bookingDate).toLocaleDateString()}
            </div>
            <div className="mb-2">
              <strong>Trạng Thái:</strong> {bookingData.status}
            </div>
            <div className="mb-2">
              <strong>Tổng Tiền:</strong> {calculateTotalPrice(bookingData.numberOfAdults, bookingData.numberOfChildren).toLocaleString()} VND
            </div>
            {bookingData.notes && (
              <div className="mb-2">
                <strong>Yêu Cầu Đặc Biệt:</strong> {bookingData.notes}
              </div>
            )}
            <div className="mb-2">
              <strong>Thông Tin Liên Hệ:</strong>
              <div>Tên Khách: {bookingData.guestName}</div>
              <div>Email: {bookingData.guestEmail || 'N/A'}</div>
              <div>Số Điện Thoại: {bookingData.guestPhoneNumber || 'N/A'}</div>
              <div>Địa Chỉ: {bookingData.guestAddress || 'N/A'}</div>
            </div>
          </div>

          {/* Thông tin Tour bên phải */}
          <div className="w-1/2 pl-4">
            <h3 className="text-2xl font-bold mb-2">Thông tin Tour</h3>
            <div className="mb-2">
              <strong>Mã Tour:</strong> {bookingData.tour?.id || 'N/A'}
            </div>
            <div className="mb-2">
              <strong>Tên Tour:</strong> {bookingData.tour?.name || 'N/A'}
            </div>
            <div className="mb-2">
              <strong>Mô Tả Tour:</strong> {bookingData.tour?.description || 'N/A'}
            </div>
            <div className="mb-2">
              <strong>Địa Điểm Tour:</strong> {bookingData.tour?.departureLocation || 'N/A'}
            </div>
            <div className="mb-2">
              <strong>Ngày Khởi Hành:</strong> {bookingData.tour?.startDate ? new Date(bookingData.tour.startDate).toLocaleDateString() : 'N/A'}
            </div>
            <div className="mb-2">
              <strong>Ngày Kết Thúc:</strong> {bookingData.tour?.endDate ? new Date(bookingData.tour.endDate).toLocaleDateString() : 'N/A'}
            </div>
            <div className="mb-2">
              <strong>Số Người Lớn:</strong> {bookingData.numberOfAdults} x {bookingData.tour?.price.toLocaleString()} VND
            </div>
            <div className="mb-2">
              <strong>Số Trẻ Em:</strong> {bookingData.numberOfChildren} x {bookingData.tour?.childPrice.toLocaleString()} VND
            </div>
            <div className="mb-2">
              <strong>Tổng số người:</strong> {bookingData.numberOfPeople}
            </div>
          </div>
        </div>

        {/* Thêm thông tin thanh toán */}
        <div className="mt-4">
          <h3 className="text-xl font-bold">Thông Tin Thanh Toán</h3>
          <div className="mb-2">
            <strong>Phương Thức Thanh Toán:</strong> {bookingData.paymentMethod || 'N/A'}
          </div>
        </div>

        {/* Nút để cập nhật và quay lại danh sách booking */}
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mt-4 mr-2"
          onClick={handleEditClick}
        >
          Sửa
        </button>

        <button
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 mt-4"
          onClick={onBack}
        >
          Quay lại danh sách
        </button>
      </div>
    </div>
  );
};

export default BookingDetail;
