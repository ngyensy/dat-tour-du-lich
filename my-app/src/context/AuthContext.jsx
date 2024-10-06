import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  // Lấy dữ liệu từ localStorage cho user và sessionStorage cho admin khi khởi tạo
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userInfo = localStorage.getItem('user');
    const adminToken = sessionStorage.getItem('adminToken'); 
    const adminInfo = sessionStorage.getItem('admin'); 


    if (userToken && userInfo) {
      setUser(JSON.parse(userInfo));
      console.log('User set in state:', JSON.parse(userInfo));
    }

    if (adminToken && adminInfo) {
      setAdmin(JSON.parse(adminInfo));
      console.log('Admin set in state:', JSON.parse(adminInfo));
    }
  }, []);

  const Userlogin = (userData) => {
    setUser(userData);
    localStorage.setItem('userToken', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('User logged in:', userData);
  };

  const loginAdmin = (adminData) => {
    setAdmin(adminData);
    sessionStorage.setItem('adminToken', adminData.token);
    sessionStorage.setItem('admin', JSON.stringify(adminData));
    console.log('Admin logged in:', adminData);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    console.log('User logged out');
  };

  const logoutAdmin = () => {
    setAdmin(null);
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('admin');
    console.log('Admin logged out');
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

export default AuthProvider;
