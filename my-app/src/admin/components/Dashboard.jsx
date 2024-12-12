import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tourCount, setTourCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // Hàm gọi API lấy số lượng tour
    const fetchTourCount = async () => {
      try {
        const response = await axios.get('http://localhost:4000/v1/tours/count');
        setTourCount(response.data.count);
      } catch (error) {
        console.error('Error fetching tour count:', error);
      }
    };

    // Hàm gọi API lấy số lượng booking
    const fetchBookingCount = async () => {
      try {
        const response = await axios.get('http://localhost:4000/v1/booking/count');
        setBookingCount(response.data.count);
      } catch (error) {
        console.error('Error fetching booking count:', error);
      }
    };

    // Hàm gọi API lấy số lượng người dùng
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:4000/v1/users/count');
        setUserCount(response.data.count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    // Hàm gọi API lấy tổng doanh thu
    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get('http://localhost:4000/v1/booking/revenue');
        setTotalRevenue(response.data.totalRevenue);
      } catch (error) {
        console.error('Error fetching total revenue:', error);
      }
    };

    fetchTourCount();
    fetchBookingCount();
    fetchUserCount();
    fetchTotalRevenue();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-semibold">Số lượng Tour</h2>
          <p className="text-2xl mt-2">{tourCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-semibold">Số lượng Booking</h2>
          <p className="text-2xl mt-2">{bookingCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-semibold">Số lượng Người dùng</h2>
          <p className="text-2xl mt-2">{userCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-semibold">Doanh thu</h2>
          <p className="text-2xl mt-2">{totalRevenue.toLocaleString()} VNĐ</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
