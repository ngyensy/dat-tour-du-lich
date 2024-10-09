import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, CurrencyDollarIcon, TicketIcon, ClockIcon } from '@heroicons/react/24/outline';

const TourItem = ({ tour }) => {
  const navigate = useNavigate();

  // Hàm điều hướng đến trang chi tiết tour
  const handleViewDetails = () => {
    navigate(`/tour/${tour.id}`);
  };

  return (
    <div className="tour-item flex mb-4 bg-white rounded">
      <img src={`http://localhost:4000${tour.image}`} alt={tour.name} className="tour-image" />
      <div className="tour-info ml-4 p-4">
        <h2 className="tour-title font-bold text-3xl mb-3">{tour.name}</h2>
        <p className="font-semibold mb-3">Mã chương trình: <span className="text-black font-bold">{tour.id.toString().slice(0, 9)}</span></p>
        <div className='flex mb-3'>
        <p className="flex items-center">
          <MapPinIcon className="h-5 w-5 mr-1" />
          <span className="text-lx ">Khởi hành:</span> <span className="text-blue-600 font-bold px-1">{tour.departureLocation}</span></p>
        <p className="flex items-center ml-8">
          <ClockIcon className="h-5 w-5 mr-1" />
          <span className="text-lx ">Thời gian:</span> <span className="text-blue-600 font-semibold px-1">{`${tour.duration}N${tour.duration - 1}D`}</span></p>
          </div>
        <p className="flex items-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 mr-1">
        <path d="M10 9.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.75-.75H10ZM6 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H6ZM8 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H8ZM9.25 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V14ZM12 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H12ZM12 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H12ZM13.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H14a.75.75 0 0 1-.75-.75V12ZM11.25 10.005c0-.417.338-.755.755-.755h2a.755.755 0 1 1 0 1.51h-2a.755.755 0 0 1-.755-.755ZM6.005 11.25a.755.755 0 1 0 0 1.51h4a.755.755 0 1 0 0-1.51h-4Z" />
        <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
      </svg>
            Ngày khởi hành:</p>
        <div className="departure-dates flex space-x-2">
          {tour.dates && tour.dates.map((date, index) => (
            <button key={index} className="border p-2 rounded">{date}</button>
          ))}
        </div>
        <div className='flex items-center mt-2'>
          <CurrencyDollarIcon className="h-5 w-5 mr-1" />
          <p className="text-sm font-bold">Giá từ: </p>
        </div>
        <div>
          <span className='text-4xl font-bold text-red-600'>{tour.price.toLocaleString()} ₫</span>
          </div>
      </div>
      <button onClick={handleViewDetails} className="ml-auto bg-blue-500 text-white p-2 rounded">
        Xem chi tiết
      </button>
    </div>
  );
};

export default TourItem;
