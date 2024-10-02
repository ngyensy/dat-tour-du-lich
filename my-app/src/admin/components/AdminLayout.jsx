import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NavAdmin from './NavAdmin';

const AdminLayout = () => {
    const {logoutAdmin} = useAuth();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white fixed top-0 left-0 h-full shadow-lg z-10">
        <div className="p-6 text-center font-bold text-2xl">Admin Panel</div>

        <nav className="mt-10">
          <ul>
            <li>
              <Link
                to="/admin/dashboard"
                className="block py-2.5 px-4 hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/tours"
                className="block py-2.5 px-4 hover:bg-gray-700"
              >
                Quản lý Tour
              </Link>
            </li>
            <li>
              <Link
                to="/admin/categories"
                className="block py-2.5 px-4 hover:bg-gray-700"
              >
                Quản lý Danh mục
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="block py-2.5 px-4 hover:bg-gray-700"
              >
                Quản lý Người dùng
              </Link>
            </li>
            <li>
              <Link
                to="/admin/bookings"
                className="block py-2.5 px-4 hover:bg-gray-700"
              >
                Quản lý Booking
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      
      <div className="flex-grow ml-64  bg-gray-100"> {/* Add margin-left to account for the fixed sidebar */}
        
        <NavAdmin />
        <div className='p-6'>
          <Outlet /> {/* This will render the corresponding component based on the route */}
          </div>    
      </div>
    </div>
  );
};

export default AdminLayout;
