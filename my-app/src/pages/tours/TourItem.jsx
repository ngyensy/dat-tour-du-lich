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
      <div className="tour-info flex-grow">
        <h2 className="tour-title font-bold text-xl mb-2">{tour.name}</h2>
        <div className='flex font-semibold items-center mb-2'>
          <TicketIcon className="h-5 w-5 mr-1" />
          <p className="font-semibold">Mã chương trình: <span className="text-black font-bold">{tour.id.toString().slice(0, 9)}</span></p>
        </div>
        <div className='flex font-semibold mb-2'>
          <p className="flex items-center ">
            <MapPinIcon className="h-5 w-5 mr-1" />
            <span className="text-sm ">Khởi hành:</span> <span className="text-blue-600 font-bold px-1">{tour.departureLocation}</span>
          </p>
          <p className="flex items-center ml-8">
            <ClockIcon className="h-5 w-5 mr-1" />
            <span className="text-sm ">Thời gian:</span> <span className="text-blue-600 font-semibold px-1">{`${tour.duration}N${tour.duration - 1}D`}</span>
          </p>
        </div>
        <div className='flex items-center mb-2'>
          <CurrencyDollarIcon className="h-5 w-5 mr-1" />
          <p className="text-sm font-bold">Giá từ: </p>
          <span className='text-2xl font-bold text-red-600 ml-2'>{tour.price.toLocaleString()} ₫</span>
        </div>
      </div>
      <button onClick={handleViewDetails} className="bg-blue-500 text-white p-2 rounded">
        Xem chi tiết
      </button>
    </div>
  );
};

export default TourItem;
