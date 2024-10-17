import React, { useState } from 'react';
import TourList from '../components/AdminTour/TourList'; 
import AddTourForm from '../components/AdminTour/AddTourForm'; 
import UpdateTourForm from '../components/AdminTour/UpdateTour'; // Import form cập nhật

const TourManagement = () => {
  const [view, setView] = useState('list');
  const [editTour, setEditTour] = useState(null); // State để lưu tour cần chỉnh sửa

  const switchToListView = () => {
    setView('list');
    setEditTour(null); // Reset tour cần chỉnh sửa khi trở về danh sách
  };

  const switchToAddTourView = () => {
    setView('addTour');
  };

  const switchToEditTourView = (tour) => {
    setEditTour(tour); // Lưu tour cần chỉnh sửa
    setView('editTour');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Quản lý Tour</h1>

      <div className="mb-4">
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

      {view === 'list' ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Danh sách Tour</h2>
          <TourList onEdit={switchToEditTourView} /> {/* Truyền hàm onEdit */}
        </div>
      ) : view === 'addTour' ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Thêm Tour mới</h2>
          <AddTourForm />
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Chỉnh sửa Tour</h2>
          <UpdateTourForm 
            tour={editTour} 
            onUpdateSuccess={switchToListView} // Gọi switchToListView khi cập nhật thành công
          /> 
        </div>
      )}
    </div>
  );
};

export default TourManagement;
