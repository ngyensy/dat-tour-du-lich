import React, { useState } from 'react';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (e) => {
        e.preventDefault();
        // Xử lý logic đổi mật khẩu ở đây, ví dụ gọi API
        if (newPassword !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp');
            return;
        }
        // Gửi yêu cầu đổi mật khẩu
        console.log("Đổi mật khẩu thành công!");
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Đổi mật khẩu</h2>
            <form onSubmit={handlePasswordChange}>
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Mật khẩu cũ:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Mật khẩu mới:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Xác nhận mật khẩu mới:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Đổi mật khẩu
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
