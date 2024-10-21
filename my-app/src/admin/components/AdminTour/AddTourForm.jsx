import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AddTourForm = () => {
  const [tourData, setTourData] = useState({
    name: '',
    description: '',
    price: '',
    childPrice: '',
    departureLocation: '',
    destination: '',
    startDate: null,
    endDate: null,
    duration: 0,
    availableSlots: 0,
    isActive: true,
    categoryId: '',
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const today = new Date();

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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'childPrice') {
      const formattedValue = value.replace(/\./g, '').replace(/\,/g, ''); // Chuyển thành số nguyên
      setTourData({
        ...tourData,
        [name]: formattedValue,
      });
    }
  };

  // Hàm handleImageChange để xử lý khi người dùng chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTourData({
        ...tourData,
        image: file,
      });
      setPreviewImage(URL.createObjectURL(file)); // Tạo URL tạm thời cho ảnh đã chọn
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const startDate = new Date(tourData.startDate);
    const endDate = new Date(tourData.endDate);
    
    if (startDate >= endDate) {
      alert("Ngày khởi hành phải trước ngày kết thúc.");
      return;
    }

    // Format ngày tháng và số tiền trước khi gửi lên backend
    const formattedStartDate = startDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const formattedEndDate = endDate.toISOString().split('T')[0]; // YYYY-MM-DD

    const formData = new FormData();
    formData.append('name', tourData.name);
    formData.append('description', tourData.description);
    formData.append('price', tourData.price.replace(/\./g, '')); // Xóa dấu chấm
    formData.append('childPrice', tourData.childPrice.replace(/\./g, '')); // Xóa dấu chấm
    formData.append('departureLocation', tourData.departureLocation);
    formData.append('destination', tourData.destination);
    formData.append('startDate', formattedStartDate);
    formData.append('endDate', formattedEndDate);
    formData.append('duration', tourData.duration);
    formData.append('availableSlots', tourData.availableSlots);
    formData.append('isActive', tourData.isActive);
    formData.append('categoryId', tourData.categoryId);
    if (tourData.image) {
      formData.append('image', tourData.image);
    }

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
            name="price"
            value={tourData.price}
            onChange={handleChange}
            onBlur={handleBlur} // Gọi hàm format khi rời khỏi input
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Giá trẻ em</label>
          <input
            type="text"
            name="childPrice"
            value={tourData.childPrice}
            onChange={handleChange}
            onBlur={handleBlur} // Gọi hàm format khi rời khỏi input
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
        {/* Ngày bắt đầu */}
        {/* Input ngày bắt đầu */}
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

        {/* Input ngày kết thúc */}
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
            value={tourData.isActive}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
          >
            <option value={true}>Kích hoạt</option>
            <option value={false}>Ngừng hoạt động</option>
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
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
          />
          {searchTerm && filteredCategories.length > 0 && (
            <ul className="max-h-60 overflow-auto border rounded">
              {filteredCategories.map(category => (
                <li
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chọn ảnh và xem trước */}
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700">Ảnh tour</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded"
          />
          {previewImage && (
            <div className="mt-4">
              <img src={previewImage} alt="Preview" className="max-w-full h-auto" />
            </div>
          )}
        </div>

        <div className="col-span-2">
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded">
            Thêm tour
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTourForm;
