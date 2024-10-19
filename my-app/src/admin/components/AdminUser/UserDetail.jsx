import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetail = ({ user, onCancel, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phoneNumber: '',
    avatar: null, // Đặt avatar là null ban đầu
  });

  const [avatarPreview, setAvatarPreview] = useState(null); // State cho preview

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber || '',
        avatar: user.avatar || null, // Đặt avatar là null nếu không có
      });

      if (user.avatar) {
        setAvatarPreview(`http://localhost:4000${user.avatar}`);
      }
    }
  }, [user]);

  // Hàm kiểm tra định dạng email
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Định dạng email cơ bản
    return re.test(email);
  };

  // Hàm kiểm tra định dạng số điện thoại
  const isValidPhoneNumber = (phoneNumber) => {
    const re = /^[0-9]{10,15}$/; // Giới hạn số điện thoại từ 10 đến 15 ký tự số
    return re.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      alert('Email không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    if (!isValidPhoneNumber(formData.phoneNumber)) {
      alert('Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('role', formData.role);

    if (formData.avatar) {
      formDataToSend.append('avatar', formData.avatar);
    } else {
      formDataToSend.append('avatar', user.avatar || '');
    }

    try {
      // Nếu có ảnh mới, gọi API để xóa ảnh cũ trước khi cập nhật
      if (formData.avatar && user.avatar) {
        await axios.delete(`http://localhost:4000/v1/users/${user.id}/avatar`, {
          data: { avatar: user.avatar }, // Gửi đường dẫn ảnh cũ để xóa
        });
      }

      const response = await axios.put(`http://localhost:4000/v1/users/${user.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Update Success:', response.data);
      alert('Người dùng đã được cập nhật thành công!');

      // Gọi hàm onUpdate để cập nhật danh sách người dùng trong UserManagement
      onUpdate(response.data);
      onCancel();
    } catch (error) {
      console.error('Lỗi cập nhật người dùng:', error);
      alert('Có lỗi xảy ra khi cập nhật người dùng. Vui lòng thử lại.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });

      // Tạo preview cho avatar
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result); // Cập nhật preview với kết quả của FileReader
      };
      reader.readAsDataURL(file); // Đọc file như là Data URL
    } else {
      setAvatarPreview(null); // Nếu không có file, đặt preview là null
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Chỉnh sửa Người dùng</h2>

      {/* Input Tên */}
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

      {/* Input Email */}
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

      {/* Input Số điện thoại */}
      <div>
        <label className="block mb-1">Số điện thoại:</label>
        <input
          type="text"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          className="border p-2 w-full mb-2"
          required
        />
      </div>

      {/* Select Vai trò */}
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

      {/* Input Avatar */}
      <div>
        <label className="block mb-1">Ảnh đại diện:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 w-full mb-2"
        />
        {/* Hiển thị ảnh đại diện hiện tại hoặc ảnh preview nếu có */}
        {avatarPreview ? (
          <div className="mt-2">
            <img src={avatarPreview} alt="Avatar Preview" className="w-32 h-32 object-cover rounded-full" />
          </div>
        ) : (
          user.avatar && (
            <div className="my-4">
              <img src={`http://localhost:4000${user.avatar}`} alt="Current Avatar" className="w-32 h-32 object-cover rounded-full" />
            </div>
          )
        )}
      </div>

      {/* Nút Lưu */}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Lưu
      </button>

      {/* Nút Hủy */}
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition ml-2"
      >
        Hủy
      </button>
    </form>
  );
};

export default UserDetail;
