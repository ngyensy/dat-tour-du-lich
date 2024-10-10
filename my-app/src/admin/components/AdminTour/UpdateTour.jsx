import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const UpdateTourForm = ({ tour, onUpdateSuccess }) => {
  const [tourData, setTourData] = useState({
    id: tour.id || '', 
    name: tour.name || '',
    description: tour.description || '',
    Price: tour.price || 0,
    childPrice: tour.childPrice || 0,
    departureLocation: tour.departureLocation || '',
    destination: tour.destination || '',
    startDate: tour.startDate ? new Date(tour.startDate) : null,
    endDate: tour.endDate ? new Date(tour.endDate) : null,
    duration: tour.duration || 0,
    availableSlots: tour.availableSlots || 0,
    isActive: tour.isActive || true,
    categoryId: tour.categoryId || '',
    image: tour.image,
  });

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const today = new Date();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/v1/categories');
        // Kiểm tra nếu response.data là một mảng
        if (Array.isArray(response.data.$values)) {
          setCategories(response.data.$values);
        } else {
          console.error('API trả về không phải là mảng:', response.data);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (Array.isArray(categories)) {
      const results = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(results);
    } else {
      setFilteredCategories([]);
    }
  }, [searchTerm, categories]);

  const formatNumber = (value) => {
    if (!value) return '';
    return Number(value).toLocaleString('vi-VN', { maximumFractionDigits: 0 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value.replace(/\./g, '');
    newValue = newValue.replace(/[^0-9]/g, '');
    setTourData({
      ...tourData,
      [name]: newValue,
    });
  };

  const handleImageChange = (e) => {
    setTourData({
      ...tourData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const startDate = new Date(tourData.startDate);
    const endDate = new Date(tourData.endDate);

    if (startDate >= endDate) {
      alert("Ngày khởi hành phải trước ngày kết thúc.");
      return;
    }

    const formData = new FormData();
    formData.append('StartDate', startDate.toISOString());
    formData.append('EndDate', endDate.toISOString());

    Object.keys(tourData).forEach((key) => {
      if (key !== 'startDate' && key !== 'endDate') {
        formData.append(key, tourData[key]);
      }
    });

    axios.put(`http://localhost:4000/v1/tours/${tourData.id}`, formData)
      .then(response => {
        console.log('Update Success:', response.data);
        alert('Tour updated successfully!');
        onUpdateSuccess(); // Gọi callback để thông báo thành công
      })
      .catch(error => {
        console.error('Error updating tour:', error);
      });
  };

  const handleCategorySelect = (category) => {
    setTourData({
      ...tourData,
      categoryId: category.id,
    });
    setSearchTerm(category.name);
    setFilteredCategories([]);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cột trái */}
        <div className="mb-4">
          <label className="block text-gray-700">Tên tour</label>
          <input
            type="text"
            name="name"
            value={tourData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mô tả</label>
          <textarea
            name="description"
            value={tourData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Giá người lớn</label>
          <input
            type="text"
            name="Price"
            value={formatNumber(tourData.Price)}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Giá trẻ em</label>
          <input
            type="text"
            name="childPrice"
            value={formatNumber(tourData.childPrice)}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Nơi khởi hành</label>
          <input
            type="text"
            name="departureLocation"
            value={tourData.departureLocation}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Điểm đến</label>
          <input
            type="text"
            name="destination"
            value={tourData.destination}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
          />
        </div>

        {/* Cột phải */}
        <div className="mb-4">
          <label className="block text-gray-700">Ngày bắt đầu</label>
          <DatePicker
            selected={tourData.startDate}
            onChange={(date) => setTourData({ ...tourData, startDate: date })}
            dateFormat="dd/MM/yyyy"
            minDate={today}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Ngày kết thúc</label>
          <DatePicker
            selected={tourData.endDate}
            onChange={(date) => setTourData({ ...tourData, endDate: date })}
            dateFormat="dd/MM/yyyy"
            minDate={tourData.startDate ? new Date(tourData.startDate) : today}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Thời gian (ngày)</label>
          <input
            type="number"
            name="duration"
            value={tourData.duration}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Số chỗ còn trống</label>
          <input
            type="number"
            name="availableSlots"
            value={tourData.availableSlots}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Trạng thái hoạt động</label>
          <select
            name="isActive"
            value={tourData.isActive ? 'true' : 'false'}
            onChange={(e) => setTourData({ ...tourData, isActive: e.target.value === 'true' })}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
          >
            <option value="true">Kích hoạt</option>
            <option value="false">Ngừng hoạt động</option>
          </select>
        </div>

        <div className="mb-4">
  <label className="block text-gray-700">Danh mục</label>
  <div className="flex items-center">
    <input
      type="text"
      value={searchTerm || (categories.find(category => category.id === tourData.categoryId)?.name || '')}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Tìm danh mục..."
      className="w-full px-4 py-2 border-2 border-gray-300 rounded"
    />
    {tourData.categoryId && ( // Kiểm tra nếu đã có danh mục được chọn
      <button
        type="button"
        onClick={() => {
          setTourData({ ...tourData, categoryId: '' }); // Xóa danh mục đã chọn
          setSearchTerm(''); // Đặt lại searchTerm
          setFilteredCategories([]); // Xóa danh sách đã lọc
        }}
        className="ml-2 text-red-600 hover:text-red-800"
      >
        Xóa
      </button>
    )}
  </div>
  {searchTerm && filteredCategories.length > 0 && ( // Chỉ hiển thị khi searchTerm không rỗng
    <ul className="absolute bg-white border border-gray-300 max-h-60 overflow-y-auto z-10">
      {filteredCategories.map(category => (
        <li
          key={category.id}
          onClick={() => handleCategorySelect(category)}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {category.name}
        </li>
      ))}
    </ul>
  )}
</div>


        <div className="mb-4">
            <label className="block text-gray-700">Hình ảnh</label>
            {tourData.image && (
              <div className="mb-2">
                <img src={`http://localhost:4000${tourData.image}`} alt="Tour" className="h-32 object-cover mb-2" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded"
            />
          </div>

        <div className="mb-4 col-span-2">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Cập nhật tour
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTourForm;
