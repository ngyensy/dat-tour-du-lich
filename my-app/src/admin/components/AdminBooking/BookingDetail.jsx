import React from 'react';

const BookingDetail = ({ booking, onBack }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Chi tiết Booking</h2>
      <div className="p-4 border border-gray-300 rounded shadow-md">
        
        <div className="flex">
          {/* Thông tin Booking bên trái */}
          <div className="w-1/2 pr-4">
            <h3 className="text-2xl font-bold mb-2">Thông tin Booking</h3>
            <div className="mb-2">
              <strong>Mã Booking:</strong> {booking.id}
            </div>
            <div className="mb-2">
              <strong>Tên Người Đặt:</strong> {booking.guestName}
            </div>
            <div className="mb-2">
              <strong>Ngày Đặt:</strong> {new Date(booking.bookingDate).toLocaleDateString()}
            </div>
            <div className="mb-2">
              <strong>Trạng Thái:</strong> {booking.status}
            </div>
            <div className="mb-2">
              <strong>Tổng Tiền:</strong> {booking.totalPrice.toLocaleString()} VND
            </div>
            {booking.notes && (
              <div className="mb-2">
                <strong>Yêu Cầu Đặc Biệt:</strong> {booking.notes}
              </div>
            )}
            <div className="mb-2">
              <strong>Thông Tin Liên Hệ:</strong>
              <div>Tên Khách: {booking.guestName}</div>
              <div>Email: {booking.guestEmail || 'N/A'}</div>
              <div>Số Điện Thoại: {booking.guestPhoneNumber || 'N/A'}</div>
              <div>Địa Chỉ: {booking.guestAddress || 'N/A'}</div>
            </div>
          </div>

          {/* Thông tin Tour bên phải */}
          <div className="w-1/2 pl-4">
            <h3 className="text-2xl font-bold mb-2">Thông tin Tour</h3>
            <div className="mb-2">
              <strong>Mã Tour:</strong> {booking.tour?.id || 'N/A'} {/* Thêm mã tour */}
            </div>
            <div className="mb-2">
              <strong>Tên Tour:</strong> {booking.tour?.name || 'N/A'}
            </div>
            <div className="mb-2">
              <strong>Mô Tả Tour:</strong> {booking.tour?.description || 'N/A'}
            </div>
            <div className="mb-2">
              <strong>Địa Điểm Tour:</strong> {booking.tour?.location || 'N/A'}
            </div>
            <div className="mb-2">
              <strong>Ngày Khởi Hành:</strong> {booking.tour?.startDate ? new Date(booking.tour.startDate).toLocaleDateString() : 'N/A'}
            </div>
            <div className="mb-2">
              <strong>Ngày Kết Thúc:</strong> {booking.tour?.endDate ? new Date(booking.tour.endDate).toLocaleDateString() : 'N/A'}
            </div>
            
            {/* Thêm thông tin số người lớn và trẻ em */}
            <div className="mb-2">
              <strong>Số Người Lớn:</strong> {booking.numberOfAdults} x {booking.tour?.price.toLocaleString()} VND
            </div>
            <div className="mb-2">
              <strong>Số Trẻ Em:</strong> {booking.numberOfChildren} x {booking.tour?.childPrice.toLocaleString()} VND
            </div>
            <div className="mb-2">
              <strong>Tổng số người:</strong> {booking.numberOfPeople}
            </div>
          </div>
        </div>

        <button
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 mt-4"
          onClick={onBack} // Quay lại danh sách booking
        >
          Quay lại danh sách
        </button>
      </div>
    </div>
  );
};

export default BookingDetail;
