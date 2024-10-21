import React, { useState } from "react";

const FilterComponent = () => {
  const [selectedBudget, setSelectedBudget] = useState("");
  const [departurePoint, setDeparturePoint] = useState("Tất cả");
  const [destinationPoint, setDestinationPoint] = useState("Tất cả");
  const [selectedDate, setSelectedDate] = useState("");
  const [tourType, setTourType] = useState("");
  const [transport, setTransport] = useState("");

  const handleApply = () => {
    // Logic xử lý khi người dùng bấm nút "Áp dụng"
    console.log({
      selectedBudget,
      departurePoint,
      destinationPoint,
      selectedDate,
      tourType,
      transport
    });
  };

  return (
    <div className="p-4 bg-gray-200 rounded-lg shadow-md w-84">

      {/* Ngân sách */}
      <div className="mb-4">
        <p className="font-bold mb-2">Ngân sách:</p>
        <div className="grid grid-cols-2 gap-2">
          {["Dưới 5 triệu", "Từ 5 - 10 triệu", "Từ 10 - 20 triệu", "Trên 20 triệu"].map((budget) => (
            <button
              key={budget}
              onClick={() => setSelectedBudget(budget)}
              className={`p-2 border rounded-md ${
                selectedBudget === budget ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {budget}
            </button>
          ))}
        </div>
      </div>

      {/* Điểm khởi hành */}
      <div className="mb-4">
        <p className="font-bold mb-2">Điểm khởi hành:</p>
        <select
          className="p-2 border rounded-md w-full"
          value={departurePoint}
          onChange={(e) => setDeparturePoint(e.target.value)}
        >
          <option>Tất cả</option>
          <option>Hà Nội</option>
          <option>TP. HCM</option>
          {/* Các điểm khởi hành khác */}
        </select>
      </div>

      {/* Điểm đến */}
      <div className="mb-4">
        <p className="font-bold mb-2">Điểm đến:</p>
        <select
          className="p-2 border rounded-md w-full"
          value={destinationPoint}
          onChange={(e) => setDestinationPoint(e.target.value)}
        >
          <option>Tất cả</option>
          <option>Đà Nẵng</option>
          <option>Phú Quốc</option>
          {/* Các điểm đến khác */}
        </select>
      </div>

      {/* Ngày đi */}
      <div className="mb-4">
        <p className="font-bold mb-2">Ngày đi:</p>
        <input
          type="date"
          className="p-2 border rounded-md w-full"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      {/* Nút Áp dụng */}
      <button
        className="w-full bg-blue-500 text-white p-2 rounded-md"
        onClick={handleApply}
      >
        Tìm kiếm
      </button>
    </div>
  );
};

export default FilterComponent;
