import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
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
        {users.map((user) => (
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
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
