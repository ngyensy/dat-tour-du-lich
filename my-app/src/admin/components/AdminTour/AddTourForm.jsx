import React, { useState } from 'react';

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
    image: null, // Thêm thuộc tính image
  });

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
      image: e.target.files[0], // Lưu file ảnh được chọn
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tour Data:', tourData);

    const formData = new FormData();
    Object.keys(tourData).forEach((key) => {
      formData.append(key, tourData[key]);
    });

    fetch('http://localhost:4000/v1/tours', {
      method: 'POST',
      body: formData, // Gửi FormData để bao gồm cả file ảnh
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Tour created successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="bg-white p-6 shadow-md rounded">
      <form onSubmit={handleSubmit}>
        {/* Các trường khác */}
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

        {/* Trường upload ảnh */}
        <div className="mb-4">
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm tour
        </button>
      </form>
    </div>
  );
};

export default AddTourForm;
