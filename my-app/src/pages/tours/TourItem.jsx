import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, ClockIcon, CurrencyDollarIcon, TicketIcon } from '@heroicons/react/24/outline';

const TourItem = ({ tour }) => {
  const navigate = useNavigate();

  // Hàm điều hướng đến trang chi tiết tour
  const handleViewDetails = () => {
    navigate(`/tour/${tour.id}`);
  };

  return (
    <div className="tour-item flex flex-col border rounded shadow-lg overflow-hidden">
      <img src={`http://localhost:4000${tour.image}`} alt={tour.name} className="tour-image w-full h-48 object-cover" />

      <div className="tour-info flex-grow p-4">
        {/* Phần tên tour với chiều cao cố định */}
        <h2 className="tour-title font-bold text-lg mb-2 overflow-hidden line-clamp-3">{tour.name}</h2>

        {/* Phần thông tin tour */}
        <div className="tour-details space-y-2">
          {/* Mã chương trình */}
          <div className='flex items-center'>
            <TicketIcon className="h-5 w-5 mr-1" />
            <p className="font-semibold">Mã chương trình: <span className="text-black font-bold">{tour.id.toString().slice(0, 9)}</span></p>
          </div>

          {/* Địa điểm khởi hành và thời gian */}
          <div className='flex items-center'>
            <MapPinIcon className="h-5 w-5 mr-1" />
            <p className="text-sm">Khởi hành: <span className="text-blue-600 font-bold">{tour.departureLocation}</span></p>
            <ClockIcon className="h-5 w-5 mr-1 ml-8" />
            <p className="text-sm">Thời gian: <span className="text-blue-600 font-bold">{`${tour.duration}N${tour.duration - 1}D`}</span></p>
          </div>

          {/* Giá tiền */}
          <div className='flex items-center'>
            <CurrencyDollarIcon className="h-5 w-5 mr-1" />
            <p className="text-sm font-bold">Giá từ: </p>
            <span className="text-2xl font-bold text-red-600 ml-2">{tour.price.toLocaleString()} ₫</span>
          </div>
        </div>
      </div>

      <button onClick={handleViewDetails} className="bg-blue-500 text-white p-2 rounded">
        Xem chi tiết
      </button>
    </div>
  );
};

export default TourItem;
