import React, { useState } from 'react';
import TourList from '../components/AdminTour/TourList'; // Component hiển thị danh sách các tour
import AddTourForm from '../components/AdminTour/AddTourForm'; // Component để thêm tour mới

const TourManagement = () => {
  const [view, setView] = useState('list'); // State để lưu trữ chế độ xem (danh sách hoặc form thêm tour)

  // Hàm chuyển đổi giữa danh sách tour và form thêm tour
  const switchToListView = () => {
    setView('list');
  };

  const switchToAddTourView = () => {
    setView('addTour');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Quản lý Tour</h1>

      <div className="mb-4">
        {/* Nút để chuyển đổi giữa hai chế độ xem */}
        {view === 'list' ? (
          <button
            onClick={switchToAddTourView}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Thêm Tour mới
          </button>
        ) : (
          <button
            onClick={switchToListView}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Quay lại Danh sách Tour
          </button>
        )}
      </div>

      {/* Hiển thị thành phần dựa trên giá trị của view */}
      {view === 'list' ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Danh sách Tour</h2>
          <TourList /> {/* Hiển thị danh sách tour */}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Thêm Tour mới</h2>
          <AddTourForm /> {/* Hiển thị form thêm tour */}
        </div>
      )}
    </div>
  );
};

export default TourManagement;
