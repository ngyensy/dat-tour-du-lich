import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
const UserDetail = ({ }) => {
    const { user } = useAuth(); 
    const [userData, setUserData] = useState({});
    const [editFields, setEditFields] = useState({});
    const [successMessage, setSuccessMessage] = useState(''); // State để lưu thông báo thành công

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/v1/Users/${user.id}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user]); // Gọi API khi userId thay đổi

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleEditClick = (key) => {
        setEditFields((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSubmit = async (e, key) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/v1/Users/${user.id}`, userData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Updated User Data:', userData);
            setEditFields((prev) => ({ ...prev, [key]: false }));
            setSuccessMessage('Cập nhật thông tin thành công!'); // Cập nhật thông báo thành công
            setTimeout(() => {
                setSuccessMessage(''); // Xóa thông báo sau 3 giây
            }, 5000);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <section className='flex flex-row justify-start items-center gap-2'>
            <div className='flex-grow p-4 border'>
                <div className='pb-5 border-b mb-4'>
                    <h2 className='text-lg font-bold'>Thông tin cá nhân</h2>
                    <p className='text-sm font-medium'>Cập nhật thông tin của Quý khách và tìm hiểu các thông tin này được sử dụng ra sao</p>
                </div>

                {/* Hiển thị thông báo thành công */}
                {successMessage && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-2 mb-4">
                        {successMessage}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    {Object.entries({
                        'Họ tên': { key: 'name', type: 'text' },
                        'Email': { key: 'email', type: 'email' },
                        'Số điện thoại': { key: 'phoneNumber', type: 'tel' },
                        'Địa chỉ': { key: 'address', type: 'text' },
                        'Giới tính': { key: 'gender', type: 'text' },
                        'Ngày sinh': { key: 'dateOfBirth', type: 'date' },
                    }).map(([label, { key, type }], index) => (
                        <React.Fragment key={key}>
                            <div className="mb-2 flex-col items-center justify-between mx-8">
                                <div className="flex justify-between w-full">
                                    <div>
                                        <strong>{label}:</strong>
                                        <span> {userData[key] || 'Chưa cập nhật'}</span>
                                    </div>
                                    <button onClick={() => handleEditClick(key)} className="text-blue-500">
                                        <FaEdit size={16} />
                                    </button>
                                </div>
                                {editFields[key] && (
                                    <form onSubmit={(e) => handleSubmit(e, key)}>
                                        <input
                                            type={type}
                                            name={key}
                                            value={userData[key] || ''}
                                            onChange={handleChange}
                                            className="border rounded px-2 py-1 mt-2"
                                            placeholder={`Nhập ${label.toLowerCase()}`}
                                        />
                                        <button type="submit" className="bg-blue-500 text-white py-1 px-2 rounded mt-2 ml-2">
                                            Cập nhật
                                        </button>
                                    </form>
                                )}
                            </div>
                            {index % 2 === 1 && (
                                <div className="border-b border-gray-300 col-span-2 my-2" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UserDetail;
