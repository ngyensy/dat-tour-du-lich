import React from 'react';
import '../../styles/TourListPage.css';
import Filter from '../../components/boloctimkiem';
import Navbar from '../../components/Nav';
import TourItem from './TourItem';
import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Footer from '../../components/Footer';

// Hàm lấy dữ liệu từ API
const fetchTours = async () => {
  const { data } = await axios.get('http://localhost:4000/v1/Tours');
  return data;
};

const TourListPage = () => {
  const [sortOption, setSortOption] = useState('asc'); // Trạng thái sắp xếp

  // Sử dụng useQuery để lấy dữ liệu
  const { data: tours = [], error, isLoading, isError } = useQuery('tours', fetchTours);

  console.log(tours);

  // Xử lý trạng thái loading, error
  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  if (isError) return <div>Lỗi: {error.message}</div>;

  // Hàm xử lý sắp xếp các tour
  const sortedTours = [...tours].sort((a, b) => {
    const priceA = a.price || 0; // Thêm fallback cho giá trị price
    const priceB = b.price || 0;
    return sortOption === 'asc' ? priceA - priceB : priceB - priceA;
  });

  return (
    <div>
      <Navbar />
      <div className="tour-list-page">
        <h1 className="category-title text-center">Tên Danh Mục</h1>
        <div className="content flex">
          <div className="sidebar bg-white shadow-none mt-6">
            <p className="font-bold text-xl mb-4">Bộ Lọc Tìm Kiếm</p>
            <Filter />
          </div>

          <div className="main-content mt-6 ml-4 w-full">
            {/* Thông báo */}
            <div className="flex border-b-2 border-gray-400 p-3 justify-between items-center mb-6 bo">
              <p className="font-normal text-lg">
                {tours.length > 0 
                  ? `Chúng tôi tìm thấy ${tours.length} chương trình tour cho Quý khách` 
                  : 'Không tìm thấy chương trình tour nào'}
              </p>

              {/* Sắp xếp */}
              <div className="sort-section flex items-center">
                <p className="font-normal text-lg">Sắp xếp theo:</p>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="ml-2 p-2 border rounded"
                >
                  <option value="asc">Giá tăng dần</option>
                  <option value="desc">Giá giảm dần</option>
                </select>
              </div>
            </div>

            {/* Danh sách tour */}  
            <div className="tour-list ">
              {tours.length > 0 ? (
                sortedTours.map((tour) => (
                  <TourItem key={tour.id} tour={tour} />
                ))
              ) : (
                <div className="text-center">Hiện tại không có tour nào khả dụng</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TourListPage;
