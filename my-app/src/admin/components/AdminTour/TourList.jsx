import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateTourForm from '../AdminTour/UpdateTour'; // Import component cập nhật

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null); // State để lưu tour được chọn cho việc cập nhật

  // Hàm fetch dữ liệu tour từ API
  const fetchTours = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v1/tours');
      setTours(response.data.$values || response.data); // Đảm bảo API trả về mảng danh sách tour
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
      await axios.delete(`http://localhost:4000/v1/tours/${tourId}`);
      // Cập nhật lại danh sách tour sau khi xóa
      setTours(prevTours => prevTours.filter((tour) => tour.id !== tourId));
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  const handleEdit = (tour) => {
    setSelectedTour(tour); // Cập nhật tour được chọn
  };

  const handleUpdateSuccess = () => {
    fetchTours(); // Cập nhật lại danh sách tour sau khi cập nhật thành công
    setSelectedTour(null); // Đặt lại tour được chọn về null
  };

  return (
    <div className="bg-white p-6 shadow-md rounded">
      {selectedTour ? (
        <UpdateTourForm 
          tour={selectedTour} 
          onUpdateSuccess={handleUpdateSuccess} 
        />
      ) : (
        <>
          {tours.length > 0 ? (
            <ul className="space-y-4">
              {tours.map((tour) => (
                <li key={tour.id} className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{tour.name}</span>
                    <div className="space-x-2">
                      {/* Nút chỉnh sửa và xóa */}
                      <button
                        onClick={() => handleEdit(tour)}
                        className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(tour.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{tour.description}</p>
                  <p className="text-sm text-gray-600">
                    Giá người lớn: {tour.price.toLocaleString()} VND - Giá trẻ em: {tour.childPrice.toLocaleString()} VND
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có tour nào.</p>
          )}
        </>
      )}
    </div>
  );
};

export default TourList;
