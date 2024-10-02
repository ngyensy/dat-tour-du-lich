import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Home from './pages/Home';
import TourDetail from './pages/tours/TourDetail';
import BookingPage from './pages/Booking';
import TourListPage from './pages/tours/TourListPage';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import CreateTour from './components/creatTour';

// ------- Các thành phần admin ---------
import AdminLayout from './admin/components/AdminLayout';
import Dashboard from './admin/Dashboard';
import TourManagement from './admin/TourManagement';
import CategoryManagement from './admin/Category';
import UserManagement from './admin/UserManagement';
import BookingManagement from './admin/BookingManagement';
import AdminLoginForm from './admin/AdminLogin'; // Đường dẫn tới form đăng nhập admin
import ProtectedRoute from './context/ProtectedRoute';

// Component AdminRoutes kiểm tra admin từ context
const AdminRoutes = () => {
  return (
    <Routes>
      {/* Route cho Admin Login */}
      <Route path="/admin/login" element={<AdminLoginForm />} />

      {/* Kiểm tra nếu admin đã đăng nhập mới cho phép truy cập các route bên dưới */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute isAdminRoute={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tours" element={<TourManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="bookings" element={<BookingManagement />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Các route cho người dùng */}
          <Route path="/" element={<Home />} />
          <Route path='/TourList' element={<TourListPage />} />
          <Route path="/tour/:id" element={<TourDetail />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/creatTour" element={<CreateTour />} />

          {/* Các route cho admin */}
          <Route path="/*" element={<AdminRoutes />} /> {/* Bao bọc AdminRoutes */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
