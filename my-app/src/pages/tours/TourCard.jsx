import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, CurrencyDollarIcon, TicketIcon, ClockIcon } from '@heroicons/react/24/outline';

const TourCard = ({ tour }) => {
  

  return (
    <Link to={`/tour/${tour.id}`} className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className='w-max h-max'>
      <img 
            src={`http://localhost:4000${tour.image}`} 
            alt={tour.name} 
            className="w-full h-52 object-cover rounded-t-lg" 
          />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{tour.name}</h2>
          <div className="flex items-center mb-1">
            <TicketIcon className="w-6 h-6 text-gray-500 mr-2" />
            <span className="text-sm font-semibold text-blue-500">{tour.id}</span>
          </div>
          <div className="flex items-center mb-1">
            <MapPinIcon className="w-6 h-6 text-gray-500 mr-2" />
            <span className="text-lx ">Khởi hành:</span> <span className="text-blue-600 font-semibold px-1">{tour.departureLocation}</span>
          </div>
          <div className="flex items-center mb-1">
            <ClockIcon className="w-6 h-6 text-gray-500 mr-2" />
            <span className="text-lx ">Thời gian:</span> <span className="text-black font-semibold px-1">{tour.duration}</span>
          </div>
          <div className="flex items-center">
            <CurrencyDollarIcon className="w-6 h-6 text-gray-500 mr-2" />
            <span className="text-sm font-bold ">Giá từ: </span> <span className="text-red-600 font-semibold px-1">{tour.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
