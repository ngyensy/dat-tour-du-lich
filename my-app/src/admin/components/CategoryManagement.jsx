import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]); // Lưu trữ danh mục đã lọc
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Lưu giá trị tìm kiếm
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hàm fetch danh mục từ API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v1/categories');
      setCategories(response.data.$values || []);
      setFilteredCategories(response.data.$values || []); // Khởi tạo danh sách lọc ban đầu bằng toàn bộ danh mục
    } catch (err) {
      setError('Có lỗi xảy ra khi lấy danh mục!');
    }
  };

  // Gọi hàm fetch danh mục khi component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Hàm xử lý tìm kiếm
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase(); // Biến đổi thành chữ thường để tìm kiếm không phân biệt hoa thường
    setSearchTerm(term);

    // Lọc danh mục theo tên
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(term)
    );
    setFilteredCategories(filtered);
  };

  // Hàm xử lý khi submit form tạo hoặc cập nhật danh mục
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const categoryData = {
        name: categoryName,
        description: categoryDescription,
      };

      if (editingCategoryId) {
        // Nếu có ID đang sửa, gửi yêu cầu PUT để cập nhật danh mục
        await axios.put(
          `http://localhost:4000/v1/categories/${editingCategoryId}`,
          categoryData
        );
      } else {
        // Nếu không có ID, gửi yêu cầu POST để tạo mới danh mục
        await axios.post('http://localhost:4000/v1/categories', categoryData);
      }

      // Fetch lại danh sách danh mục sau khi thêm mới hoặc cập nhật thành công
      fetchCategories();

      // Reset form
      setCategoryName('');
      setCategoryDescription('');
      setEditingCategoryId(null);
    } catch (err) {
      setError('Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý khi nhấn nút "Sửa"
  const handleEdit = (category) => {
    setCategoryName(category.name);
    setCategoryDescription(category.description);
    setEditingCategoryId(category.id);
  };

  // Hàm xử lý khi nhấn nút "Hủy" để thoát chế độ sửa
  const handleCancelEdit = () => {
    setCategoryName('');
    setCategoryDescription('');
    setEditingCategoryId(null);
  };

  // Hàm xóa danh mục
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa danh mục này?');
    if (!confirmDelete) return; // Hủy nếu không đồng ý xóa

    try {
      await axios.delete(`http://localhost:4000/v1/categories/${id}`);
      // Cập nhật danh sách sau khi xóa thành công
      setCategories(categories.filter((category) => category.id !== id));
      setFilteredCategories(filteredCategories.filter((category) => category.id !== id));
    } catch (err) {
      setError('Có lỗi xảy ra khi xóa danh mục!');
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded">
      <h1 className="text-3xl font-bold mb-4">Quản lý Danh mục</h1>

      {/* Form tạo/cập nhật danh mục */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Tên danh mục
          </label>
          <input
            type="text"
            id="name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <textarea
            id="description"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {editingCategoryId ? (loading ? 'Đang cập nhật...' : 'Cập nhật') : (loading ? 'Đang tạo...' : 'Tạo danh mục')}
          </button>
          {editingCategoryId && (
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={handleCancelEdit}
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      {/* Thanh tìm kiếm */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">Tìm kiếm danh mục</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearch}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Nhập tên danh mục để tìm..."
        />
      </div>

      {/* Hiển thị danh sách danh mục */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <h2 className="text-2xl font-bold mb-4">Danh sách danh mục</h2>
      {filteredCategories.length > 0 ? (
        <ul className="space-y-4">
        {filteredCategories.map((category) => (
            <li key={category.id} className="border-b pb-2"> {/* Đảm bảo sử dụng unique key ở đây */}
                <div className="flex justify-between items-center">
                    <span className="font-semibold">{category.name}</span>
                    <div className="space-x-2">
                        <button
                            className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                            onClick={() => handleEdit(category)}
                        >
                            Sửa
                        </button>
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            onClick={() => handleDelete(category.id)}
                        >
                            Xóa
                        </button>
                    </div>
                </div>
                <p className="text-sm text-gray-600">{category.description}</p>
            </li>
        ))}
    </ul>
      ) : (
        <p>Không có danh mục nào khớp với tìm kiếm.</p>
      )}
    </div>
  );
};

export default CategoryManagement;
