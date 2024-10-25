import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Giả sử bạn đã có AuthContext để lấy thông tin user

const UserBookings = () => {
    const { user } = useAuth(); // Lấy thông tin người dùng từ AuthContext
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user?.id) return; // Nếu không có userId thì không gọi API

            try {
                const response = await axios.get(`http://localhost:4000/v1/booking`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`, // Truyền token nếu cần thiết
                    },
                });

                // Lọc ra các booking có userId tương ứng
                const userBookings = response.data.$values.filter(booking => booking.userId === user.id);
                setBookings(userBookings); // Cập nhật state với các booking của người dùng hiện tại
            } catch (err) {
                setError('Lỗi khi lấy dữ liệu booking');
                console.error('Error fetching bookings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (bookings.length === 0) {
        return <div>Bạn chưa có đơn đặt nào.</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Đơn đã đặt</h2>
            <ul className="space-y-4">
                {bookings.map((booking) => (
                    <li key={booking.id} className="border p-4 rounded-lg">
                        <div><strong>Tên tour:</strong> {booking.tour?.name}</div>
                        <div><strong>Ngày đặt:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</div>
                        <div><strong>Số lượng người:</strong> {booking.numberOfAdults} người lớn, {booking.numberOfChildren} trẻ em</div>
                        <div><strong>Tổng tiền:</strong> {booking.totalPrice.toLocaleString()} VND</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserBookings;
