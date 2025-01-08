import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import VietinBankQR from "../components/BankTransferQR"; // Import component QR

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const totalAmount = location.state?.booking.totalPrice; // Tổng số tiền cần thanh toán
    const amountToPay = (totalAmount * 0.5).toFixed(0); // 50% tổng số tiền

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

    // Kiểm tra phương thức thanh toán có phải là chuyển khoản, momo hay zalo không
    const isBankTransfer = booking.paymentMethod.toLowerCase() === "chuyển khoản";
    const isCash = booking.paymentMethod.toLowerCase() === "tiền mặt";
    const isMomo = booking.paymentMethod.toLowerCase() === "Thanh toán bằng MoMo";
    const isZaloPay = booking.paymentMethod.toLowerCase() === "Thanh toán bằng ZaloPay";

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

                {/* Tạo mã QR nếu phương thức thanh toán là chuyển khoản */}
                {isBankTransfer && (
                    <div className="mt-6">
                        <VietinBankQR
                            accountNumber="0342965559" // Thay bằng số tài khoản thực tế
                            accountName="NGUYEN THI HONG HA"
                            amount={amountToPay} // Số tiền cần thanh toán// Mô tả cho việc thanh toán
                        />
                    </div>
                )}

                {/* Hiển thị hướng dẫn nếu phương thức thanh toán là tiền mặt */}
                {isCash && (
                    <div className="mt-6 text-center">
                        <p className="text-lg text-gray-700">
                            Vui lòng đến các chi nhánh gần nhất của chúng tôi để thanh toán. 
                        </p>
                        <a
                            href="/contact"
                            className="text-blue-500 hover:underline"
                        >
                            Danh sách chi nhánh
                        </a>
                    </div>
                )}

                {/* Hiển thị mã QR hoặc hướng dẫn nếu phương thức thanh toán là Momo */}
                {isMomo && (
                    <div className="mt-6 text-center">
                        <p className="text-lg text-gray-700">
                            Quý khách vui lòng sử dụng Momo để thanh toán số tiền {amountToPay} VND.
                        </p>
                        {/* Thêm mã QR cho Momo ở đây nếu có */}
                        <img src="/images/momo-qr.png" alt="QR Momo" className="mx-auto" />
                    </div>
                )}

                {/* Hiển thị mã QR hoặc hướng dẫn nếu phương thức thanh toán là ZaloPay */}
                {isZaloPay && (
                    <div className="mt-6 text-center">
                        <p className="text-lg text-gray-700">
                            Quý khách vui lòng sử dụng ZaloPay để thanh toán số tiền {amountToPay} VND.
                        </p>
                        {/* Thêm mã QR cho ZaloPay ở đây nếu có */}
                        <img src="/images/zalopay-qr.png" alt="QR ZaloPay" className="mx-auto" />
                    </div>
                )}

                {/* Nút xuất PDF */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => alert("PDF xuất thành công!")}
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
