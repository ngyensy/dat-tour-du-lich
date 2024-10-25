import React from 'react';
import Navbar from '../components/Nav'
import TravelSlider from '../components/TravelSlider';
import Section from './tours/Section';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

const Home = () => {
    return (
      <div>
        <Navbar />
        <TravelSlider />
        <SearchBar />
        <Section 
          title="Tour hot" 
          description="Nhanh tay nắm bắt cơ hội giảm giá cuối cùng. Đặt ngay để không bỏ lỡ!" 
        />
        <Footer />
      </div>
    );
  };
  
  export default Home;