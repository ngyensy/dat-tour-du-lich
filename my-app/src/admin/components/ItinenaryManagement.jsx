import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Itinerary from './ItinenaryAdmin/ItinenaryItem'; // Import component Itinerary
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // Sử dụng build Classic

const ItineraryManagement = () => {
  const [itineraries, setItineraries] = useState([]);
  const [newItinerary, setNewItinerary] = useState({ dayNumber: '', description: '', tourId: '' });
  const [editingItinerary, setEditingItinerary] = useState(null);
  const [searchTourId, setSearchTourId] = useState(''); // Trạng thái cho tìm kiếm tourId

  const fetchItineraries = async (tourId) => {
    try {
      const response = await axios.get(`http://localhost:4000/v1/itinerary?tourId=${tourId}`);
      console.log('Fetched itineraries:', response.data.$values); // Log dữ liệu
      setItineraries(response.data.$values);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
    }
  };

  const handleCreateItinerary = async () => {
    try {
      await axios.post('http://localhost:4000/v1/itinerary', {
        ...newItinerary,
        tourId: searchTourId, // Sử dụng tourId từ tìm kiếm
      });
      fetchItineraries(searchTourId); // Cập nhật lại danh sách
      setNewItinerary({ dayNumber: '', description: '', tourId: '' }); // Reset form
    } catch (error) {
      console.error('Error creating itinerary:', error);
    }
  };

  const handleUpdateItinerary = async () => {
    try {
      await axios.put(`http://localhost:4000/v1/itinerary/${editingItinerary.id}`, editingItinerary);
      fetchItineraries(searchTourId); // Cập nhật lại danh sách
      setEditingItinerary(null); // Reset trạng thái chỉnh sửa
    } catch (error) {
      console.error('Error updating itinerary:', error);
    }
  };

  const handleDeleteItinerary = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/v1/itinerary/${id}`);
      fetchItineraries(searchTourId); // Cập nhật lại danh sách
    } catch (error) {
      console.error('Error deleting itinerary:', error);
    }
  };

  const handleSearch = () => {
    if (searchTourId) {
      console.log('Searching for tourId:', searchTourId); // Log tìm kiếm
      fetchItineraries(searchTourId); // Tìm lịch trình theo tourId
    } else {
      console.log('No tourId entered');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Quản lý lịch trình Tour</h1>

      {/* Form tìm kiếm lịch trình theo tourId */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Tìm kiếm lịch trình theo Tour ID</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Nhập Tour ID"
            value={searchTourId}
            onChange={(e) => setSearchTourId(e.target.value)}
            className="border px-2 py-1"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Form thêm lịch trình mới */}
      {searchTourId && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Thêm lịch trình mới</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Ngày"
              value={newItinerary.dayNumber}
              onChange={(e) => setNewItinerary({ ...newItinerary, dayNumber: e.target.value })}
              className="border px-2 py-1"
            />
            {/* Sử dụng CKEditor thay cho ReactQuill */}
            <CKEditor
              editor={ClassicEditor}
              data={newItinerary.description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setNewItinerary({ ...newItinerary, description: data });
              }}
              className="border"
            />
            <button
              onClick={handleCreateItinerary}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Thêm
            </button>
          </div>
        </div>
      )}

      {/* Hiển thị lịch trình sau khi tìm kiếm */}
      {searchTourId && itineraries.length > 0 && (
        <Itinerary itineraries={itineraries} onEdit={setEditingItinerary} onDelete={handleDeleteItinerary} />
      )}

      {/* Form chỉnh sửa lịch trình */}
      {editingItinerary && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Chỉnh sửa lịch trình</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={editingItinerary.dayNumber}
              onChange={(e) => setEditingItinerary({ ...editingItinerary, dayNumber: e.target.value })}
              className="border px-2 py-1"
            />
            {/* Sử dụng CKEditor cho phần chỉnh sửa */}
            <CKEditor
              editor={ClassicEditor}
              data={editingItinerary.description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditingItinerary({ ...editingItinerary, description: data });
              }}
              className="border"
            />
            <button
              onClick={handleUpdateItinerary}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Cập nhật
            </button>
            <button
              onClick={() => setEditingItinerary(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryManagement;
