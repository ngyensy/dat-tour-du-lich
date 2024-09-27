  import React, { useEffect, useState  } from 'react';
  import { useLocation, useNavigate } from 'react-router-dom';
  import { useAuth } from '../context/AuthContext'; // Import useAuth để lấy thông tin người dùng
  import Navbar from '../components/Nav';
  import CategoryNav from '../components/CategoryNav';
  import Footer from '../components/Footer';
  import { MapPinIcon, CurrencyDollarIcon, TicketIcon } from '@heroicons/react/24/outline';
  import axios from 'axios';

  const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { tour } = location.state || {}; // Lấy thông tin tour từ state
    const { user } = useAuth(); // Lấy thông tin người dùng từ AuthContext
    const [totalPrice, setTotalPrice] = useState(0); 

    

    const [formData, setFormData] = useState({
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      guestAddress: '',
      numberOfAdults: 1,
      numberOfChildren: 0,
      singleRoom: false,
      notes: '',
    });

    useEffect(() => {
      if (user) {
        setFormData({
          ...formData,
          guestName: user.name || '',
          guestEmail: user.email || '',
          guestPhone: user.phoneNumber || '',
          guestAddress: user.address || ''
        });
      }
    }, [user]);

    useEffect(() => {
      // Tính toán tổng tiền dựa trên số lượng người lớn, trẻ em và phụ thu phòng đơn
      const calculatedPrice =
        formData.numberOfAdults * tour.price +
        formData.numberOfChildren * tour.childPrice +
        (formData.singleRoom ? tour.SingleRoomSurcharge : 0);
  
      setTotalPrice(calculatedPrice);
    }, [formData, tour.Price, tour.childPrice, tour.SingleRoomSurcharge]);
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const bookingData = {
          tourId: tour.id,
          userId: user?.id || null, // ID người dùng nếu có
          guestName: formData.guestName,
          guestEmail: formData.guestEmail,
          guestPhone: formData.guestPhone,
          guestAddress: formData.guestAddress,
          numberOfAdults: formData.numberOfAdults,
          numberOfChildren: formData.numberOfChildren,
          singleRoom: formData.singleRoom,
          totalPrice: totalPrice,
          notes: formData.notes,
        };
  
        const response = await axios.post('http://localhost:4000/v1/booking', bookingData);
  
        if (response.status === 200) {
          alert('Đặt tour thành công!');
          navigate('/confirmation', { state: { bookingId: response.data.id } });
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi khi đặt tour. Vui lòng thử lại.');
      }
    };

    if (!tour) {
      return <div>Thông tin tour không có</div>;
    }

    return (
      <div>
        <Navbar />
        <CategoryNav />

        <div className="container mx-auto my-8 px-32">
          <div className="flex justify-between mb-6">
            <button className="text-blue-600" onClick={() => window.history.back()}>
              ← Quay lại
            </button>
          </div>

          <div className="flex justify-center mb-10">
            <h2 className="text-3xl text-blue-700 font-bold">ĐẶT TOUR</h2>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Phần thông tin khách hàng */}
            <div className="md:w-2/3 pr-4">
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold mb-2">THÔNG TIN LIÊN LẠC</h3>
                <div className="flex flex-wrap mb-4">
                  <div className="w-full md:w-1/2 px-2">
                    <label className="block font-semibold" htmlFor="guestName">Họ tên <span className='text-red-600'>*</span></label>
                      <input
                        type="text"
                        id="guestName"
                        name="guestName"
                        className="border w-full p-2 rounded-lg"
                        placeholder="Nhập họ tên"
                        value={formData.guestName}
                        onChange={handleChange}
                        required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-2">
                    <label className="block font-semibold" htmlFor="guestEmail">Email <span className='text-red-600'>*</span></label>
                      <input
                        type="email"
                        id="guestEmail"
                        name="guestEmail"
                        className="border w-full p-2 rounded-lg"
                        placeholder="Nhập email"
                        value={formData.guestEmail}
                        onChange={handleChange}
                        required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-2">
                    <label className="block font-semibold" htmlFor="guestPhone">Điện thoại <span className='text-red-600'>*</span></label>
                      <input
                        type="text"
                        id="guestPhone"
                        name="guestPhone"
                        className="border w-full p-2 rounded-lg"
                        placeholder="Nhập số điện thoại"
                        value={formData.guestPhone}
                        onChange={handleChange}
                        required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-2">
                    <label className="block font-semibold" htmlFor="address">Địa chỉ</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="border w-full p-2 rounded-lg"
                      placeholder="Nhập địa chỉ"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">HÀNH KHÁCH</h3>
                <div className="mb-4">
                  <label className="block font-semibold">Người lớn (Từ 12 tuổi)</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-200 rounded-lg"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          numberOfAdults: Math.max(formData.numberOfAdults - 1, 1),
                        })
                      }
                    >
                      -
                    </button>
                    <span className="mx-4">{formData.numberOfAdults}</span>
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-200 rounded-lg"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          numberOfAdults: formData.numberOfAdults + 1,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-semibold">Trẻ em (Dưới 11 tuổi)</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-200 rounded-lg"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          numberOfChildren: Math.max(formData.numberOfChildren - 1, 0),
                        })
                      }
                    >
                      -
                    </button>
                    <span className="mx-4">{formData.numberOfChildren}</span>
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-200 rounded-lg"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          numberOfChildren: formData.numberOfChildren + 1,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">THÔNG TIN HÀNH KHÁCH</h3>

                <div className="mb-4">
                <label className="block font-semibold" htmlFor="notes">Ghi chú</label>
                <textarea
                  id="notes"
                  name="notes"
                  className="border w-full p-2 rounded-lg"
                  placeholder="Nhập ghi chú"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

                <button
                  type="submit"
                  className="bg-red-600 text-white py-2 px-4 rounded-lg"
                >
                  Đặt tour
                </button>
              </form>
            </div>

            {/* Phần tóm tắt chuyến đi */}
            <div className='md:w-2/4 pl-4'>
              <h3 className="text-xl font-bold mb-2">TÓM TẮT CHUYẾN ĐI</h3>
              <div className="bg-[#f8f8f8] rounded-xl">
                <div className="border p-4 border-none">
                  <div className="mb-4 border-b-2 border-gray-400">
                      <img src={`http://localhost:4000${tour.image}`} alt={tour.name} className="rounded-lg" />
                      <p className="font-semibold mt-2">{tour.name}</p>
                    </div>
                    <ul className="text-gray-700 space-y-2">
                      <li className='flex items-center '>
                        <TicketIcon className="w-6 h-6 text-gray-500 mr-2" />
                        <strong>Mã tour:</strong> <span className="text-blue-600 font-semibold pl-1">{tour.id}</span>
                        </li>
                      <li className='flex items-center pb-5 border-b-2 border-gray-400'>
                        <CurrencyDollarIcon className="w-6 h-6 text-gray-500 mr-1" />
                        <strong>Thời gian:</strong> <span className="text-blue-600 font-semibold pl-1">{tour.duration}</span>
                        
                        <MapPinIcon className="w-6 h-6 text-gray-500 mr-1 ml-11" />
                        <strong>Khởi hành:</strong> <span className="text-blue-600 font-semibold pl-1">{tour.departureLocation}</span>
                      </li>
                      <li className='flex items-center text-sm'>
                        <strong>Ngày đi:</strong> <span className="text-blue-600 font-semibold pl-1">{tour.startDate}</span>
                        <strong className='ml-5'>Ngày về:</strong> <span className="text-blue-600 font-semibold pl-1">{tour.endDate}</span>
                        </li>
                      
                      <li className=" pb-5 border-b-2 border-gray-400">
                            <div className='flex items-center mt-6'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                              </svg>
                              <h3 className="text-lg font-bold mb-2 ml-2">KHÁCH HÀNG + PHỤ THU</h3>
                            </div>
                            <div className="flex font-bold justify-between mb-2">
                              <span>Người lớn</span>
                              <span>
                                {formData.numberOfAdults} x {tour.price.toLocaleString()} đ
                              </span>
                            </div>
                            <div className="flex font-bold justify-between mb-2">
                              <span>Trẻ em</span>
                              <span>
                                {formData.numberOfChildren} x {tour.childPrice.toLocaleString()} đ
                              </span>
                            </div>

                            <div className="flex font-bold justify-between mb-2">
                              <span>Phụ thu phòng đơn</span>
                              <span>{formData.singleRoom ? `${tour.SingleRoomSurcharge.toLocaleString()} đ` : '0 đ'}</span>
                            </div>

                            <div className="flex justify-between mt-4 border-t-2 pt-4 border-gray-400">
                              <h4 className="text-2xl font-bold">Tổng tiền</h4>
                              <h4 className="text-red-600 text-4xl font-bold">
                                {totalPrice.toLocaleString()} đ
                              </h4>
                            </div>
                        </li>
                    </ul>
                </div>
              </div>
          </div>
        </div>
        </div>
        <Footer />  
      </div>
    );
  };

  export default BookingPage;
