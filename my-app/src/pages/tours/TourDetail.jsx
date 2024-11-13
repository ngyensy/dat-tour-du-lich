import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import Navbar from '../../components/Nav';
import CategoryNav from '../../components/CategoryNav';
import Footer from '../../components/Footer';
import { MapPinIcon, CalendarIcon, CurrencyDollarIcon, TicketIcon } from '@heroicons/react/24/outline';
import ImportantInfo from '../../components/thongtinluuy';
import Itinerary from '../../components/itinerary';

const TourDetail = () => {
  const navigate = useNavigate();  // Thay vì useHistory, sử dụng useNavigate
  const { id } = useParams();  // Lấy id từ URL
  const [tour, setTour] = useState(null);  // State để lưu thông tin tour
  const [loading, setLoading] = useState(true);  // State để quản lý trạng thái loading
  const [error, setError] = useState(null);  // State để lưu lỗi nếu có

  const formattedDate = tour && tour.startDate ? (() => {
    const formattedStartDate = new Date(tour.startDate);
    const day = formattedStartDate.getDate().toString().padStart(2, '0');
    const month = (formattedStartDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedStartDate.getFullYear();
    return `${day}-${month}-${year}`;
  })() : 'Ngày không hợp lệ';

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

  // Tính giá sau khi áp dụng giảm giá
  const calculateDiscountPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    const discountAmount = (price * discount) / 100;
    return price - discountAmount;
  };

   // Giá người lớn sau khi áp dụng giảm giá
   const adultDiscountPrice = calculateDiscountPrice(tour.price, tour.discount);


  return (
    <div>
      <Navbar />
      <CategoryNav categoryId={tour.category?.id} tourName={tour.name}/>

      <div className="container mx-auto my-8 px-32">
        <h1 className="text-3xl font-bold mb-8">
          <span className="">{tour.name}</span>
        </h1>
        <div className="flex flex-col md:flex-row">
          {/* Phần hình ảnh bên trái */}
          <div className="md:w-2/3 pr-4">
            <div className="mb-4">
              <img src={`http://localhost:4000${tour.image}`} alt={tour.name} className="w-full h-[32rem] object-cover rounded-lg" />
            </div>

            <div className='my-12'>
              <Itinerary itineraries={tour.itineraries.$values} />
            </div>

            <div className='my-12'>
            <ImportantInfo />
            </div>

          </div>

          {/* Phần thông tin chi tiết bên phải */}
          <div className="md:w-1/3">
            <div className='border-2 ml-4 p-4 rounded-lg shadow-md shadow-gray-400 sticky top-4'>
              <div className="text-[1.1rem] flex justify-between font-semibold">
                <span className="">Giá:</span>
                {tour.discount > 0 &&(
                  <div className=''>
                  <span className="text-[#b1b1b1] line-through ml-2">
                    {tour.price.toLocaleString()} ₫ 
                  </span> 
                  <a className='text-[#b1b1b1] '>/Khách</a>
                  </div>
                )} 
              </div>
              <div className="text-4xl font-semibold mb-4 mt-2">
                <span className="text-red-600 font-bold"> {adultDiscountPrice.toLocaleString()} ₫</span><a className='font-normal text-2xl'>/Khách</a>
              </div>

              <ul className="space-y-2 mb-4">
                <li className='flex items-center '>
                  <TicketIcon className="w-6 h-6 text-gray-500 mr-2" />
                  <strong>Mã tour:</strong> <span className="text-blue-600 font-semibold pl-1">{tour.id}</span>
                </li>
                <li className='flex items-center '> 
                  <MapPinIcon className="w-6 h-6 text-gray-500 mr-2" />
                  <strong>Khởi hành:</strong> <span className="text-blue-600 font-semibold pl-1">{tour.departureLocation}</span>
                </li>
                <li className='flex items-center '>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path fill="#000" fillRule="evenodd" d="M3 20.535C3 21.345 3.656 22 4.465 22h15.07c.81 0 1.465-.656 1.465-1.465v-4.794a.293.293 0 0 0-.586 0v4.794a.88.88 0 0 1-.879.88H4.465a.88.88 0 0 1-.879-.88v-1.63a.293.293 0 0 0-.586 0z" clipRule="evenodd"></path>
                  <path fill="#000" fillRule="evenodd" d="M3 19.361c0 .81.657 1.467 1.467 1.467h11.88c.389 0 .762-.154 1.037-.43l3.186-3.186c.275-.275.43-.648.43-1.037V4.805c0-.81-.657-1.466-1.467-1.466H4.467C3.657 3.339 3 3.996 3 4.806zm1.467.881a.88.88 0 0 1-.881-.88V4.805a.88.88 0 0 1 .881-.881h15.066a.88.88 0 0 1 .881.88v11.37a.88.88 0 0 1-.258.623l-3.186 3.186a.88.88 0 0 1-.623.258z" clipRule="evenodd"></path>
                  <path fill="#000" fillRule="evenodd" d="M15.573 20.535c0 .162.13.293.293.293.692 0 1.254-.562 1.254-1.255v-1.955c0-.37.3-.67.67-.67h1.955c.693 0 1.255-.56 1.255-1.254a.293.293 0 0 0-.586 0c0 .37-.3.669-.669.669H17.79c-.693 0-1.255.562-1.255 1.255v1.955c0 .37-.3.67-.668.67a.293.293 0 0 0-.293.292M3 7.819c0 .161.131.292.293.292h3.464a.293.293 0 1 0 0-.585H3.293A.293.293 0 0 0 3 7.819M7.636 7.819c0 .161.131.292.293.292h12.778a.293.293 0 1 0 0-.585H7.929a.293.293 0 0 0-.293.293M5.72 4.786c0 .492.399.891.89.891a.293.293 0 1 0 0-.586.305.305 0 0 1-.304-.305V2.891c0-.169.136-.305.305-.305h.134c.169 0 .305.136.305.305v.74a.293.293 0 0 0 .586 0v-.74A.89.89 0 0 0 6.746 2H6.61a.89.89 0 0 0-.891.89zM16.364 4.786c0 .492.399.891.89.891a.293.293 0 1 0 0-.586.305.305 0 0 1-.304-.305V2.891c0-.169.136-.305.305-.305h.134c.169 0 .305.136.305.305v.74a.293.293 0 1 0 .586 0v-.74A.89.89 0 0 0 17.39 2h-.135a.89.89 0 0 0-.891.89zM4.758 11.25c0 .316.256.572.572.572h1.395a.57.57 0 0 0 .572-.572V9.855a.57.57 0 0 0-.572-.572H5.33a.57.57 0 0 0-.572.572zm.586-.014V9.87h1.367v1.367zM8.74 11.25c0 .316.256.572.572.572h1.395a.57.57 0 0 0 .572-.572V9.855a.57.57 0 0 0-.572-.572H9.312a.57.57 0 0 0-.572.572zm.586-.014V9.87h1.367v1.367zM12.721 11.25c0 .316.256.572.572.572h1.395a.57.57 0 0 0 .572-.572V9.855a.57.57 0 0 0-.572-.572h-1.395a.57.57 0 0 0-.572.572zm.586-.014V9.87h1.367v1.367zM16.703 11.25c0 .316.256.572.572.572h1.395a.57.57 0 0 0 .572-.572V9.855a.57.57 0 0 0-.572-.572h-1.395a.57.57 0 0 0-.572.572zm.586-.014V9.87h1.367v1.367zM4.758 14.874c0 .316.256.572.572.572h1.395a.57.57 0 0 0 .572-.572V13.48a.57.57 0 0 0-.572-.572H5.33a.57.57 0 0 0-.572.572zm.586-.014v-1.367h1.367v1.367zM8.74 14.874c0 .316.256.572.572.572h1.395a.57.57 0 0 0 .572-.572V13.48a.57.57 0 0 0-.572-.572H9.312a.57.57 0 0 0-.572.572zm.586-.014v-1.367h1.367v1.367zM12.721 14.874c0 .316.256.572.572.572h1.395a.57.57 0 0 0 .572-.572V13.48a.57.57 0 0 0-.572-.572h-1.395a.57.57 0 0 0-.572.572zm.586-.014v-1.367h1.367v1.367zM16.703 14.961c0 .316.256.572.572.572h1.395a.57.57 0 0 0 .572-.572v-1.395a.57.57 0 0 0-.572-.572h-1.395a.57.57 0 0 0-.572.572zm.586-.014V13.58h1.367v1.367zM4.758 18.498c0 .316.256.572.572.572h1.395a.57.57 0 0 0 .572-.572v-1.395a.57.57 0 0 0-.572-.572H5.33a.57.57 0 0 0-.572.572zm.586-.014v-1.367h1.367v1.367zM8.74 18.498c0 .316.256.572.572.572h1.395a.57.57 0 0 0 .572-.572v-1.395a.57.57 0 0 0-.572-.572H9.312a.57.57 0 0 0-.572.572zm.586-.014v-1.367h1.367v1.367zM12.721 18.498c0 .316.256.572.572.572h1.395a.57.57 0 0 0 .572-.572v-1.395a.57.57 0 0 0-.572-.572h-1.395a.57.57 0 0 0-.572.572zm.586-.014v-1.367h1.367v1.367zM16.703 18.498c0 .316.256.572.572.572h1.395a.57.57 0 0 0 .572-.572v-1.395a.57.57 0 0 0-.572-.572h-1.395a.57.57 0 0 0-.572.572zm.586-.014v-1.367h1.367v1.367z" clipRule="evenodd"></path>
                </svg>
                  <strong className='ml-2'>Ngày khởi hành:</strong> <span className="text-blue-600 font-semibold pl-1">{formattedDate}</span>
                </li>
                <li className='flex items-center '>
                  <CurrencyDollarIcon className="w-6 h-6 text-gray-500 mr-2" />
                  <strong>Thời gian:</strong> <span className="text-blue-600 font-semibold pl-1">{`${tour.duration}N${tour.duration - 1}D`}</span>
                </li>
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
      </div>
      <Footer />
    </div>
  );
};

export default TourDetail;
