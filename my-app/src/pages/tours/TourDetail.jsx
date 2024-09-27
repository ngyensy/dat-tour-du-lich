import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import Navbar from '../../components/Nav';
import CategoryNav from '../../components/CategoryNav';
import Footer from '../../components/Footer';
import { MapPinIcon, CalendarIcon, CurrencyDollarIcon, TicketIcon } from '@heroicons/react/24/outline';

const TourDetail = () => {
  const navigate = useNavigate();  // Thay vì useHistory, sử dụng useNavigate
  const { id } = useParams();  // Lấy id từ URL
  const [tour, setTour] = useState(null);  // State để lưu thông tin tour
  const [loading, setLoading] = useState(true);  // State để quản lý trạng thái loading
  const [error, setError] = useState(null);  // State để lưu lỗi nếu có

  // Hàm để gọi API lấy dữ liệu tour dựa trên id
  const fetchTour = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/v1/Tours/${id}`);  // URL API lấy thông tin tour
      setTour(response.data);  // Cập nhật dữ liệu tour
      setLoading(false);  // Tắt trạng thái loading
    } catch (err) {
      console.error('Error fetching tour:', err);
      setError('Không thể tải dữ liệu tour');
      setLoading(false);  // Tắt trạng thái loading nếu lỗi xảy ra
    }
  };

  // Gọi fetchTour khi component mount hoặc khi id thay đổi
  useEffect(() => {
    fetchTour();
  }, [id]);

  const handleBookingClick = () => {
    navigate(`/booking/${id}`, { state: { tour } });  // Điều hướng tới trang đặt tour với state
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!tour) {
    return <div>Tour không tồn tại</div>;
  }

  return (
    <div>
      <Navbar />
      <CategoryNav /> 

      <div className="container mx-auto my-8 px-32">
        <h1 className="text-3xl font-bold mb-2">
          <span className="">{tour.name}</span>
        </h1>
        <div className="flex flex-col md:flex-row">
          {/* Phần hình ảnh bên trái */}
          <div className="md:w-2/3 pr-4">
            <div className="mb-4">
              <img src={`http://localhost:4000${tour.image}`} alt={tour.name} className="w-full h-auto object-cover rounded-lg" />
            </div>
          </div>

          {/* Phần thông tin chi tiết bên phải */}
          <div className="md:w-1/3 pl-4">
            <div className="text-lg font-semibold">
              <span className="">Giá:</span>
            </div>
            <div className="text-3xl font-semibold mb-4">
              <span className="text-red-600 font-bold">{tour.price} đ</span> <a className='font-medium text-lg'>/Khách</a>
            </div>

            <ul className="space-y-2 mb-4">
              <li className='flex items-center '>
                <TicketIcon className="w-6 h-6 text-gray-500 mr-2" />
                <strong>Mã tour:</strong> <span className="text-blue-600 font-semibold pl-1">{tour.id}</span></li>
              <li className='flex items-center '> 
                <MapPinIcon className="w-6 h-6 text-gray-500 mr-2" />
                <strong>Khởi hành:</strong> <span className="text-blue-600 font-semibold pl-1">{tour.departureLocation}</span></li>
              <li className='flex items-center '>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
              </svg>
                <strong>Ngày khởi hành:</strong> <span className="text-blue-600 font-semibold pl-1">{tour.startDate}</span></li>
              <li className='flex items-center '>
                <CurrencyDollarIcon className="w-6 h-6 text-gray-500 mr-2" />
                <strong>Thời gian:</strong> <span className="text-blue-600 font-semibold pl-1">{tour.duration}</span></li>
            </ul>

            <div className="flex space-x-4 mb-4">
              <button className="bg-red-600 text-white py-2 px-4 rounded-lg" onClick={handleBookingClick}>Đặt tour</button>
            </div>

            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Gọi miễn phí qua internet</button>
              <button className="bg-gray-200 py-2 px-4 rounded-lg">Liên hệ tư vấn</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TourDetail;
