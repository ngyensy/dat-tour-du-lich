import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TourDetail from './pages/tours/TourDetail';
import BookingPage from './pages/Booking';
import TourListPage from './pages/tours/TourListPage';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import CreateTour from './components/creatTour';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/TourList' element={<TourListPage />} />
          <Route path="/tour/:id" element={<TourDetail />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/creatTour" element={<CreateTour />} />
        </Routes>
      </Router>
    </AuthProvider>
    );
};

export default App;
