import React, { useState } from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm)
  );

  return (
    <div>
      {/* Thanh tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo email hoặc số điện thoại"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      {/* Bảng hiển thị người dùng */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border justify-center">ID</th>
            <th className="py-2 px-4 border justify-center">Tên</th>
            <th className="py-2 px-4 border justify-center">Email</th>
            <th className="py-2 px-4 border justify-center">Số điện thoại</th>
            <th className="py-2 px-4 border justify-center">Vai trò</th>
            <th className="py-2 px-4 border justify-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border text-center">{user.id}</td>
                <td className="py-2 px-4 border text-center">{user.name}</td>
                <td className="py-2 px-4 border text-center">{user.email}</td>
                <td className="py-2 px-4 border text-center">{user.phoneNumber}</td>
                <td className="py-2 px-4 border text-center">{user.role}</td>
                <td className="py-2 px-4 border text-center">
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 mr-2"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="py-4 px-4 text-center text-gray-500 border"
              >
                Không tìm thấy người dùng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
