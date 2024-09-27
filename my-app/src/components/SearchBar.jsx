import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let validationErrors = {};

    if (!destination) {
      validationErrors.destination = 'Bạn cần nhập điểm đến!';
    }

    return validationErrors;
  };

  const handleSearch = () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log({
        destination,
        departureDate,
        budget,
      });
      // Thực hiện hành động tìm kiếm tại đây
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-lg py-8 px-12 w-3/4 mx-auto my-12">
      <div className="flex items-center justify-between space-x-4">
        {/* Điểm đến */}
        <div className="flex flex-col w-1/4">
          <label className="font-bold">Bạn muốn đi đâu? *</label>
          <input
            type="text"
            className={`border rounded-lg p-2 mt-1 ${errors.destination ? 'border-red-500' : 'border-black'}`}
            placeholder="Địa danh"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          {errors.destination && <p className="text-red-500 text-sm">{errors.destination}</p>}
        </div>

        {/* Ngày đi */}
        <div className="flex flex-col w-1/4">
          <label className="font-bold">Ngày đi</label>
          <input
            type="date"
            className="border border-black rounded-lg p-2 mt-1"
            value={departureDate}
            min={new Date().toISOString().split("T")[0]}  // Chỉ cho phép chọn ngày hiện tại và tương lai
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        {/* Ngân sách */}
        <div className="flex flex-col w-1/4">
          <label className="font-bold">Ngân sách</label>
          <select
            className="border border-black rounded-lg p-2 mt-1"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Chọn mức giá</option>
            <option value="budget1">Dưới 5 triệu</option>
            <option value="budget2">5 - 10 triệu</option>
            <option value="budget3">Trên 10 triệu</option>
          </select>
        </div>

        {/* Nút tìm kiếm */}
        <div className="flex items-center w-1/8">
          <button
            className="bg-blue-600 text-white p-3 rounded-lg flex items-center mt-5"
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
