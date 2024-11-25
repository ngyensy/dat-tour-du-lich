import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpdateTourForm from '../AdminTour/UpdateTour';

const TourList = ({ searchQuery, onEdit }) => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const navigate = useNavigate();

  const fetchTours = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v1/tours');
      setTours(response.data.$values || response.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (tourId) => {
    try {
      await axios.delete(`http://localhost:4000/v1/tours/${tourId}`);
      setTours((prevTours) => prevTours.filter((tour) => tour.id !== tourId));
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  const handleEdit = (tour) => {
    setSelectedTour(tour);
    onEdit(tour);
  };

  const handleUpdateSuccess = () => {
    fetchTours();
    setSelectedTour(null);
  };

  const handleItinerary = (tourId) => {
    navigate(`/admin/itinerary?tourId=${tourId}`);
  };

  // Lọc các tour theo mã tour hoặc tên tour
  const filteredTours = tours.filter((tour) =>
    tour.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white p-6 shadow-md rounded">
      {selectedTour ? (
        <UpdateTourForm tour={selectedTour} onUpdateSuccess={handleUpdateSuccess} />
      ) : (
        <>
          {filteredTours.length > 0 ? (
            <ul className="space-y-4">
              {filteredTours.map((tour) => (
                <li key={tour.id} className="border-b pb-2">
                  <span className="font-semibold">{tour.id}</span>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{tour.name}</span>
                    <div className="space-x-2">
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
                      <button
                        onClick={() => handleItinerary(tour.id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        Lịch trình
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
            <p>Không tìm thấy tour nào.</p>
          )}
        </>
      )}
    </div>
  );
};

export default TourList;
