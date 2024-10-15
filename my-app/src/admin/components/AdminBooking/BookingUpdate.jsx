import { useState, useEffect } from 'react';

const UpdateBookingForm = ({ booking, onUpdate, onCancel }) => {
  // Tạo state để lưu giá trị cập nhật của booking
  const [updatedBooking, setUpdatedBooking] = useState({
    guestName: booking.guestName,
    guestEmail: booking.guestEmail,
    guestPhoneNumber: booking.guestPhoneNumber,
    guestAddress: booking.guestAddress,
    numberOfAdults: booking.numberOfAdults,
    numberOfChildren: booking.numberOfChildren,
    totalPrice: booking.totalPrice,
    notes: booking.notes,
    paymentMethod: booking.paymentMethod, // Thêm PaymentMethod
    status: booking.status // Thêm Status
  });

  // Cập nhật state khi booking thay đổi
  useEffect(() => {
    setUpdatedBooking({
      guestName: booking.guestName,
      guestEmail: booking.guestEmail,
      guestPhoneNumber: booking.guestPhoneNumber,
      guestAddress: booking.guestAddress,
      numberOfAdults: booking.numberOfAdults,
      numberOfChildren: booking.numberOfChildren,
      totalPrice: booking.totalPrice,
      notes: booking.notes,
      paymentMethod: booking.paymentMethod, // Thêm PaymentMethod
      status: booking.status // Thêm Status
    });
  }, [booking]);

  // Tính lại tổng tiền khi số người lớn hoặc trẻ em thay đổi
  const calculateTotalPrice = (numberOfAdults, numberOfChildren) => {
    const adultPrice = booking.tour?.price || 0;
    const childPrice = booking.tour?.childPrice || 0;
    return (numberOfAdults * adultPrice) + (numberOfChildren * childPrice);
  };

  // Cập nhật state khi người dùng nhập
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBooking((prev) => ({
      ...prev,
      [name]: value,
      totalPrice: name === 'numberOfAdults' || name === 'numberOfChildren'
        ? calculateTotalPrice(
            name === 'numberOfAdults' ? value : prev.numberOfAdults,
            name === 'numberOfChildren' ? value : prev.numberOfChildren
          )
        : prev.totalPrice,
    }));
  };

  // Gửi dữ liệu cập nhật khi form được submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!booking.id) {
        console.error("Booking ID is missing. Cannot update the booking.");
        return;
    }
    onUpdate({ ...updatedBooking, tourId: booking.tourId, id: booking.id }); // Thêm ID vào dữ liệu gửi đi
};

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Cập nhật Booking</h2>

      <div className="mb-2">
        <label className="block font-bold">Tên Người Đặt</label>
        <input
          type="text"
          name="guestName"
          value={updatedBooking.guestName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block font-bold">Email</label>
        <input
          type="email"
          name="guestEmail"
          value={updatedBooking.guestEmail}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block font-bold">Số Điện Thoại</label>
        <input
          type="text"
          name="guestPhoneNumber"
          value={updatedBooking.guestPhoneNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block font-bold">Địa Chỉ</label>
        <input
          type="text"
          name="guestAddress"
          value={updatedBooking.guestAddress}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block font-bold">Số Người Lớn</label>
        <input
          type="number"
          name="numberOfAdults"
          value={updatedBooking.numberOfAdults}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block font-bold">Số Trẻ Em</label>
        <input
          type="number"
          name="numberOfChildren"
          value={updatedBooking.numberOfChildren}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block font-bold">Tổng Tiền</label>
        <input
          type="text"
          name="totalPrice"
          value={updatedBooking.totalPrice}
          readOnly
          className="w-full p-2 border rounded bg-gray-200"
        />
      </div>

      <div className="mb-2">
        <label className="block font-bold">Ghi Chú</label>
        <textarea
          name="notes"
          value={updatedBooking.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Thêm trường cho PaymentMethod */}
      <div className="mb-2">
        <label className="block font-bold">Phương Thức Thanh Toán</label>
        <input
          type="text"
          name="paymentMethod"
          value={updatedBooking.paymentMethod}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Thêm trường cho Status */}
      <div className="mb-2">
        <label className="block font-bold">Trạng Thái</label>
        <select
          name="status"
          value={updatedBooking.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Confirmed">Đã Xác Nhận</option>
          <option value="Pending">Đang Chờ</option>
          <option value="Cancelled">Đã Hủy</option>
        </select>
      </div>

      <div className="flex justify-between mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Cập nhật
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
          Hủy
        </button>
      </div>
    </form>
  );
};

export default UpdateBookingForm;
