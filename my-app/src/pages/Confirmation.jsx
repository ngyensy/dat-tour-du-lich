import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf"; // Import jsPDF
import Navbar from "../components/Nav";
import Footer from "../components/Footer";


const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { booking, tour } = location.state || {}; // Nhận dữ liệu từ state

    if (!booking || !tour) {
        return (
            <div>
                <Navbar />

                <div className="flex justify-center mb-10">
                    <h2 className="text-3xl text-blue-700 font-bold">XÁC NHẬN ĐẶT TOUR</h2>
                </div>

                <div className="text-center my-32">
                    <p className="text-red-500">Không có dữ liệu để hiển thị.</p>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                    >
                        Quay về trang đặt tour
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    // Hàm xuất PDF bằng jsPDF
    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.addFont('path-to-your-font.ttf', 'NotoSans', 'normal'); // Thêm font có hỗ trợ Unicode
        doc.setFont('NotoSans');

        // Thêm thông tin khách hàng    
        doc.text(`Họ tên: ${booking.guestName}`, 10, 10);
        doc.text(`Email: ${booking.guestEmail}`, 10, 20);
        doc.text(`Số điện thoại: ${booking.guestPhoneNumber}`, 10, 30);
        doc.text(`Địa chỉ: ${booking.guestAddress}`, 10, 40);

        // Thêm thông tin tour
        doc.text(`Tên tour: ${tour.name}`, 10, 60);
        doc.text(`Mô tả: ${tour.description}`, 10, 70);
        doc.text(`Địa điểm khởi hành: ${tour.departureLocation}`, 10, 80);
        doc.text(`Điểm đến: ${tour.destination}`, 10, 90);

        // Thêm thông tin booking
        doc.text(`Số lượng người lớn: ${booking.numberOfAdults}`, 10, 110);
        doc.text(`Số lượng trẻ em: ${booking.numberOfChildren}`, 10, 120);
        doc.text(`Tổng tiền: ${booking.totalPrice.toLocaleString()} VND`, 10, 130);
        doc.text(`Phương thức thanh toán: ${booking.paymentMethod}`, 10, 140);

        // Xuất PDF
        doc.save("xac-nhan-dat-tour.pdf");
    };

    return (
        <div>
            <Navbar />

            <div className="flex justify-center my-10">
                    <h2 className="text-3xl text-blue-700 font-bold">XÁC NHẬN ĐẶT TOUR</h2>
                </div>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Xác Nhận Đặt Tour</h1>

                {/* Nội dung xác nhận đặt tour */}
                <div className="p-6 bg-gray-50 rounded-md">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Thông Tin Khách Hàng</h2>
                        <p><strong>Họ tên:</strong> {booking.guestName}</p>
                        <p><strong>Email:</strong> {booking.guestEmail}</p>
                        <p><strong>Số điện thoại:</strong> {booking.guestPhoneNumber}</p>
                        <p><strong>Địa chỉ:</strong> {booking.guestAddress}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Thông Tin Tour</h2>
                        <p><strong>Tên tour:</strong> {tour.name}</p>
                        <p><strong>Mô tả:</strong> {tour.description}</p>
                        <p><strong>Địa điểm khởi hành:</strong> {tour.departureLocation}</p>
                        <p><strong>Điểm đến:</strong> {tour.name}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Chi Tiết Booking</h2>
                        <p><strong>Số lượng người lớn:</strong> {booking.numberOfAdults}</p>
                        <p><strong>Số lượng trẻ em:</strong> {booking.numberOfChildren}</p>
                        <p><strong>Tổng tiền:</strong> {booking.totalPrice.toLocaleString()} VND</p>
                        <p><strong>Phương thức thanh toán:</strong> {booking.paymentMethod}</p>
                    </div>
                </div>

                {/* Nút xuất PDF */}
                <div className="mt-6 text-center">
                    <button
                        onClick={handleExportPDF}
                        className="bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-600"
                    >
                        Xuất PDF
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Confirmation;
