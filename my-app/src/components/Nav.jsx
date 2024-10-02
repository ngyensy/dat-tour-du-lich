import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import AuthContext
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="bg-white-500 py-4 flex px-40">
      <div className="container mx-auto flex items-center h-12 ">
        <Link to="/" className="flex items-center mr-auto">
          <img src={logo} alt="Logo" className="h-20" />
        </Link>

        <div className="flex items-center space-x-32">
          <ul className="flex space-x-10">
            <li>
              <Link to="/TourList" className="text-black hover:text-gray-600 text-lg">TOURS</Link>
            </li>
            <li>
              <Link to="/about" className="text-black hover:text-gray-600 text-lg">Giới thiệu</Link>
            </li>
            <li>
              <Link to="/contact" className="text-black hover:text-gray-600 text-lg">Liên hệ</Link>
            </li>
          </ul>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-black text-lg">Xin chào, {user.name}</span>
              <button
                onClick={logoutUser}
                className="text-black hover:text-gray-600 border-2 border-black px-3 py-1 rounded-lg"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-black hover:text-gray-600 flex items-center justify-center w-9 h-9 bg-white border-2 border-black rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
