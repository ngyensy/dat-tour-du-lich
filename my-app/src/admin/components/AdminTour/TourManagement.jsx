import React, { useState } from 'react';
//import TourList from './TourList'; // Component hiển thị danh sách các tour
import AddTourForm from './AddTourForm'; // Component để thêm tour mới

const TourManagement = () => {
  const [showAddTourForm, setShowAddTourForm] = useState(false);

  // Hàm để toggle form thêm tour
  const toggleAddTourForm = () => {
    setShowAddTourForm(!showAddTourForm);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Quản lý Tour</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Danh sách tour */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Danh sách Tour</h2>
          
        </div>

        {/* Thêm tour mới */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Thêm Tour mới</h2>
          <button
            onClick={toggleAddTourForm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {showAddTourForm ? 'Đóng' : 'Thêm Tour mới'}
          </button>

          {showAddTourForm && (
            <div className="mt-4">
              <AddTourForm /> {/* Hiển thị form thêm tour mới */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourManagement;
