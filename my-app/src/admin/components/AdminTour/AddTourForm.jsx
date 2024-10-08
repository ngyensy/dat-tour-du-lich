import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTourForm = () => {
  const [tourData, setTourData] = useState({
    name: '',
    description: '',
    Price: 0,
    childPrice: 0,
    departureLocation: '',
    destination: '',
    startDate: '',
    endDate: '',
    duration: 0,
    availableSlots: 0,
    isActive: true,
    categoryId: '',
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/v1/categories')
      .then(response => {
        setCategories(response.data.$values);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    const results = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(results);
  }, [searchTerm, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData({
      ...tourData,
      [name]: value,
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
    console.log('Tour Data:', tourData);

    const formData = new FormData();
    Object.keys(tourData).forEach((key) => {
      formData.append(key, tourData[key]);
    });

    axios.post('http://localhost:4000/v1/tours', formData)
      .then(response => {
        console.log('Success:', response.data);
        alert('Tour created successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
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
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mô tả</label>
          <textarea
            name="description"
            value={tourData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Giá người lớn</label>
          <input
            type="number"
            name="Price"
            value={tourData.Price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Giá trẻ em</label>
          <input
            type="number"
            name="childPrice"
            value={tourData.childPrice}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
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
            className="w-full px-4 py-2 border rounded"
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
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Cột phải */}
        <div className="mb-4">
          <label className="block text-gray-700">Ngày bắt đầu</label>
          <input
            type="date"
            name="startDate"
            value={tourData.startDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Ngày kết thúc</label>
          <input
            type="date"
            name="endDate"
            value={tourData.endDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
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
            className="w-full px-4 py-2 border rounded"
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
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Trạng thái hoạt động</label>
          <select
            name="isActive"
            value={tourData.isActive}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>

        {/* Tìm kiếm danh mục */}
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700">Danh mục tour</label>
          <input
            type="text"
            placeholder="Tìm kiếm danh mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-2"
          />
          {searchTerm && filteredCategories.length > 0 && (
            <ul className="max-h-60 overflow-auto border rounded">
              {filteredCategories.map(category => (
                <li
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Trường upload ảnh */}
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700">Ảnh tour</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 col-span-2"
        >
          Thêm tour
        </button>
      </form>
    </div>
  );
};

export default AddTourForm;
