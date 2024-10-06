import React, { useEffect, useState } from 'react';

const TourList = () => {
  const [tours, setTours] = useState([]);

  // Hàm fetch dữ liệu tour từ API
  const fetchTours = async () => {
    try {
      const response = await fetch('http://localhost:4000/v1/tours'); // URL đến API lấy danh sách tour
      const data = await response.json();
      setTours(data); // Giả sử API trả về một mảng danh sách tour
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  // Lấy dữ liệu khi component được mount
  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (tourId) => {
    try {
      await fetch(`http://localhost:4000/v1/tours/${tourId}`, {
        method: 'DELETE',
      });
      // Cập nhật lại danh sách tour sau khi xóa
      setTours(tours.filter((tour) => tour.id !== tourId));
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded">
      {tours.length > 0 ? (
        <ul className="space-y-4">
          {tours.map((tour) => (
            <li key={tour.id} className="border-b pb-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{tour.name}</span>
                <div className="space-x-2">
                  {/* Nút chỉnh sửa và xóa */}
                  <button className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">
                    Sửa
                  </button>
                  <button 
                  onClick={() => handleDelete(tour.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Xóa
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">{tour.description}</p>
              <p className="text-sm text-gray-600">
                Giá người lớn: {tour.price} VND - Giá trẻ em: {tour.childPrice} VND
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có tour nào.</p>
      )}
    </div>
  );
};

export default TourList;
