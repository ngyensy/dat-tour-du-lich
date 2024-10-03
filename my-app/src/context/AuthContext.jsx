import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  // Lấy dữ liệu từ localStorage cho user và sessionStorage cho admin khi khởi tạo
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userInfo = localStorage.getItem('user');

    const adminToken = sessionStorage.getItem('adminToken'); // Đổi sang sessionStorage
    const adminInfo = sessionStorage.getItem('admin'); // Đổi sang sessionStorage

    if (userToken && userInfo) {
      setUser(JSON.parse(userInfo));
    }

    if (adminToken && adminInfo) {
      setAdmin(JSON.parse(adminInfo));
    }
  }, []);

  // Đăng nhập cho user
  const Userlogin = (userData) => {
    setUser(userData);
    localStorage.setItem('userToken', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('User logged in:', userData); // Log khi user đăng nhập
  };

  // Đăng nhập cho admin
  const loginAdmin = (adminData) => {
    setAdmin(adminData);
    sessionStorage.setItem('adminToken', adminData.token); // Đổi sang sessionStorage
    sessionStorage.setItem('admin', JSON.stringify(adminData)); // Đổi sang sessionStorage
    console.log('Admin logged in:', adminData); // Log khi admin đăng nhập
  };

  // Đăng xuất cho user
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    console.log('User logged out'); // Log khi user đăng xuất
};

  // Đăng xuất cho admin
  const logoutAdmin = () => {
    setAdmin(null);
    sessionStorage.removeItem('adminToken'); // Đổi sang sessionStorage
    sessionStorage.removeItem('admin'); // Đổi sang sessionStorage
    console.log('Admin logged out'); // Log khi admin đăng xuất
  };

  return (
    <AuthContext.Provider value={{ user, admin, Userlogin, loginAdmin, logoutUser, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
