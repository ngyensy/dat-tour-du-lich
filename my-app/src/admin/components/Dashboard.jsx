import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Số lượng Tour</h2>
          <p className="text-2xl mt-2">10</p> {/* Sample data */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Số lượng Booking</h2>
          <p className="text-2xl mt-2">25</p> {/* Sample data */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Số lượng Người dùng</h2>
          <p className="text-2xl mt-2">50</p> {/* Sample data */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
