import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Để lưu thông tin người dùng được chọn cho việc chỉnh sửa
  const [isAdding, setIsAdding] = useState(false); // Để kiểm tra xem đang thêm người dùng mới hay không
  const [formData, setFormData] = useState({ name: '', email: '', role: '' }); // Để lưu dữ liệu form

  // Hàm lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v1/users');
      setUsers(response.data.$values || response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Lấy dữ liệu khi component được mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/v1/users', formData);
      fetchUsers(); // Cập nhật lại danh sách sau khi thêm người dùng
      resetForm(); // Đặt lại form
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/v1/users/${selectedUser.id}`, formData);
      fetchUsers(); // Cập nhật lại danh sách sau khi chỉnh sửa
      resetForm(); // Đặt lại form
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/v1/users/${userId}`);
      fetchUsers(); // Cập nhật lại danh sách sau khi xóa
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditButtonClick = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', role: '' });
    setSelectedUser(null);
    setIsAdding(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Quản lý Người dùng</h1>
      <div className="mb-4">
        <button
          onClick={() => {
            resetForm();
            setIsAdding(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Thêm Người dùng mới
        </button>
      </div>

      {isAdding || selectedUser ? (
        <form onSubmit={selectedUser ? handleEditUser : handleAddUser} className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{selectedUser ? 'Chỉnh sửa Người dùng' : 'Thêm Người dùng'}</h2>
          <div>
            <label className="block mb-1">Tên:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border p-2 w-full mb-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border p-2 w-full mb-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Vai trò:</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="border p-2 w-full mb-2"
              required
            >
              <option value="">Chọn vai trò</option>
              <option value="Admin">Quản trị viên</option>
              <option value="User">Người dùng</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            {selectedUser ? 'Cập nhật' : 'Thêm'}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition ml-2"
          >
            Hủy
          </button>
        </form>
      ) : null}

      <h2 className="text-xl font-semibold mb-4">Danh sách Người dùng</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="border-b pb-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{user.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditButtonClick(user)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
            <p className="text-sm text-gray-600">Vai trò: {user.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
