import React from 'react';
//import TourList from './TourList';
//import AddTourForm from './AddTourForm';

const TourManagement = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Quản lý Tour</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold">Danh sách Tour</h2>
          
        </div>
        <div>
          <h2 className="text-xl font-semibold">Thêm Tour mới</h2>
          
        </div>
      </div>
    </div>
  );
};

export default TourManagement;
