import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';


const UserBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

     // State để điều khiển việc hiển thị modal
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user?.id || !user.token) return;

            try {
                const response = await axios.get('http://localhost:4000/v1/booking', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const userBookings = (response.data.$values || response.data).filter(
                    booking => booking.userId === user.id
                );
                setBookings(userBookings);
            } catch (err) {
                setError('Lỗi khi lấy dữ liệu booking');
                console.error('Error fetching bookings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    // Lọc booking theo trạng thái
    const filterBookingsByStatus = (status) => {
        if (status === 'all') {
            return bookings;
        }
        return bookings.filter(booking => booking.status === status);
    };

    // Tìm kiếm booking
    const searchBookings = useMemo(() => {
        return bookings.filter((booking) => {
            const tourName = booking.tour?.name?.toLowerCase() || '';
            const tourId = booking.tour?.id?.toLowerCase() || '';
            const bookingId = booking.id.toLowerCase();
            const searchTermLower = searchTerm.toLowerCase();

            return (
                tourName.includes(searchTermLower) ||
                tourId.includes(searchTermLower) ||
                bookingId.includes(searchTermLower)
            );
        });
    }, [searchTerm, bookings]);

    // Lọc theo trạng thái đã chọn
    const filteredBookings = filterBookingsByStatus(activeTab);
    const finalBookings = searchBookings.length ? searchBookings : filteredBookings;

    const tabs = [
        { key: 'all', label: 'Tất cả' },
        { key: 'Chờ xác nhận', label: 'Chờ xác nhận' },
        { key: 'Đã xác nhận', label: 'Đã xác nhận' },
        { key: 'Đã thanh toán', label: 'Đã thanh toán' },
        { key: 'Đã Hủy Booking', label: 'Đã Hủy Booking' },
    ];

    if (!user) {
        return <div>Bạn cần đăng nhập để xem các tour đã đặt.</div>;
    }

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (bookings.length === 0) {
        return <div>Bạn chưa có đơn đặt nào.</div>;
    }

    const openModal = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    return (
        <div className='border p-4 border-gray-500'>
            <div className='border-b border-gray-500 pb-5'>
                <h2 className="text-xl font-bold">Tour đã đặt</h2>
                <p className='text-[1rem] font-medium'>Hãy quản lý Tour một cách thông minh để trải nghiệm đầy đủ dịch vụ của chúng tôi!</p>
            </div>

            {/* Tìm kiếm */}
            <div className="mb-5 mt-2">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên tour, ID tour hoặc ID booking..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded"
                />
            </div>

            {/* Tabs trạng thái */}
            <div className="flex gap-4 mb-5 justify-center my-4 border-b border-gray-500 pb-4">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 rounded ${activeTab === tab.key ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Danh sách booking */}
            <ul className="space-y-4">
                {filteredBookings.length === 0 ? (
                    <div className="text-center text-gray-500">Không có booking nào!</div>
                ) : (
                    filteredBookings.map((booking) => (
                        <li key={booking.id} className="border p-4 rounded-lg flex gap-4">
                            <img
                                src={`http://localhost:4000${booking.tour?.image}` || '/default-tour.jpg'}
                                alt={booking.tour?.name}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <div><strong>Tên tour:</strong> {booking.tour?.name}</div>
                                <div><strong>ID tour:</strong> {booking.tour?.id}</div>
                                <div><strong>ID booking:</strong> {booking.id}</div>
                                <div><strong>Ngày đặt:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</div>
                                <div><strong>Số lượng:</strong> {booking.numberOfAdults} người lớn, {booking.numberOfChildren} trẻ em</div>
                                <div><strong>Tổng tiền:</strong> {formatCurrency(booking.totalPrice)}</div>
                                <div><strong>Trạng thái:</strong> {booking.status}</div>
                                <button
                                    onClick={() => openModal(booking)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>

            {/* Modal hiển thị chi tiết booking */}
                {isModalOpen && selectedBooking && (
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg w-full sm:w-2/3">
                            <h3 className="text-2xl font-bold mb-4">Chi tiết booking</h3>

                            <div className="flex">
                                {/* Thông tin Booking bên trái */}
                                <div className="w-1/2 pr-4">
                                    <h4 className="text-xl font-semibold mb-2">Thông tin Booking</h4>
                                    <div><strong>ID booking:</strong> {selectedBooking.id}</div>
                                    <div><strong>Ngày đặt:</strong> {new Date(selectedBooking.bookingDate).toLocaleDateString()}</div>  
                                    
                                    {/* Số lượng người lớn và trẻ em với giá tiền */}
                                    <div><strong>Số người lớn:</strong> {selectedBooking.numberOfAdults} x {formatCurrency(selectedBooking.tour?.price)}</div>
                                    <div><strong>Số trẻ em:</strong> {selectedBooking.numberOfChildren} x {formatCurrency(selectedBooking.tour?.childPrice)}</div>
                                    <div><strong>Phụ thu phòng đơn:</strong> {formatCurrency(selectedBooking.totalSingleRoomSurcharge)}</div>
                                    <div><strong>Tổng tiền:</strong> {formatCurrency(selectedBooking.totalPrice)}</div>
                                    <div><strong>Trạng thái:</strong> {selectedBooking.status}</div>
                                </div>

                                {/* Thông tin Tour bên phải */}
                                <div className="w-1/2 pl-4">
                                    <h4 className="text-xl font-semibold mb-2">Thông tin Tour</h4>
                                    <div><strong>Tên tour:</strong> {selectedBooking.tour?.name}</div>
                                    <div><strong>ID tour:</strong> {selectedBooking.tour?.id}</div>
                                    <div><strong>Địa điểm khởi hành:</strong> {selectedBooking.tour?.departureLocation || 'N/A'}</div>
                                    <div><strong>Ngày khởi hành:</strong> {selectedBooking.tour?.startDate ? new Date(selectedBooking.tour.startDate).toLocaleDateString() : 'N/A'}</div>
                                    <div><strong>Ngày kết thúc:</strong> {selectedBooking.tour?.endDate ? new Date(selectedBooking.tour.endDate).toLocaleDateString() : 'N/A'}</div>
                                </div>
                            </div>

                            {/* Thêm thông tin thanh toán */}
                            <div><strong>Phương thức thanh toán:</strong> {selectedBooking.paymentMethod || 'N/A'}</div>

                            {/* Nút đóng modal */}
                            <button
                                onClick={closeModal}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                )}



        </div>
    );
};

export default UserBookings;
