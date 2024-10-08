import { useState } from "react";

const DayItem = ({ day, description, meals }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg my-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center font-medium font-sans text-lg w-full px-4 py-2 bg-gray-50 hover:bg-blue-200 text-left rounded-lg transition duration-200"
      >
        <span>{day}</span>
        <span>{isOpen ? 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <path fill="#000" fillRule="evenodd" d="M6.414 9.532a.75.75 0 0 1 1.055-.118L12 13.04l4.532-3.626a.75.75 0 1 1 .936 1.172l-5 4a.75.75 0 0 1-.937 0l-5-4a.75.75 0 0 1-.117-1.054" clipRule="evenodd"></path>
            </svg> 
            : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <path fill="#000" fillRule="evenodd" d="M17.586 14.469a.75.75 0 0 1-1.054.117L12 10.96l-4.532 3.626a.75.75 0 0 1-.937-1.172l5-4a.75.75 0 0 1 .938 0l5 4a.75.75 0 0 1 .117 1.055" clipRule="evenodd"></path>
            </svg>
        }</span>
      </button>
      {isOpen && (
        <div className="px-4 py-2 relative">
          {/* Chấm dọc bên cạnh nội dung */}
          <span className="absolute left-0 top-3 transform -translate-x-1/2 w-3 h-3 bg-gray-400 rounded-full"></span>
          {description}
        </div>
      )}
    </div>
  );
};

const Itinerary = ({ itineraries }) => {
    return (
      <div className="pt-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          LỊCH TRÌNH
        </h2>
        {itineraries.map((item, index) => (
          <DayItem
            key={index}
            day={item.dayNumber}
            description={item.description} 
          />
        ))}
      </div>
    );
  };
  

export default Itinerary;
