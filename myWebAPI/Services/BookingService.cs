using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using WebApi.Helpers;
using WebApi.Entities;
using WebApi.Models;
using System;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Services
{
    public interface IBookingService
    {
        IEnumerable<BookingModel> GetAllBookings();
        BookingModel GetById(string id);
        void Create(BookingModel booking);
        void Update(string id, BookingModel booking);
        void Delete(string id);
        int GetBookingCount();
    }

    public class BookingService : IBookingService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public BookingService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<BookingModel> GetAllBookings()
        {
            var bookings = _context.Bookings
                .Include(b => b.Tour) // Bao gồm thông tin Tour
                .ToList();

            return _mapper.Map<IEnumerable<BookingModel>>(bookings);
        }

        public BookingModel GetById(string id)
        {
            var booking = _context.Bookings
                .Include(b => b.Tour) // Include để load thông tin Tour
                .FirstOrDefault(b => b.Id == id); // Lấy booking theo id

            return _mapper.Map<BookingModel>(booking);
        }

        public void Create(BookingModel bookingModel)
        {
            var tour = _context.Tours.FirstOrDefault(t => t.Id == bookingModel.TourId) ?? throw new ArgumentException("Tour không tồn tại!");

            // Tính tổng số người đặt
            int totalPeople = bookingModel.NumberOfAdults + bookingModel.NumberOfChildren;

            // Kiểm tra số chỗ còn lại có đủ không
            if (tour.AvailableSlots < totalPeople)
            {
                throw new InvalidOperationException("Số chỗ còn lại không đủ!");
            }

            // Trừ số người đặt khỏi số chỗ còn lại
            tour.AvailableSlots -= totalPeople;

            // Chuyển đổi BookingModel thành Booking entity
            var bookingEntity = _mapper.Map<Booking>(bookingModel);

            // Tạo BookingId ngẫu nhiên
            bookingEntity.Id = IdGenerator.GenerateBookingId(10);

            // Chỉnh sửa thời gian đặt chỗ, loại bỏ mili giây
            bookingEntity.BookingDate = bookingModel.BookingDate.AddMilliseconds(-bookingModel.BookingDate.Millisecond);

            // Thêm entity vào cơ sở dữ liệu
            _context.Bookings.Add(bookingEntity);

            // Lưu thay đổi vào cơ sở dữ liệu
            _context.SaveChanges(); // Lưu cả booking và số chỗ còn lại của tour
        }

        public void Update(string id, BookingModel bookingModel)
        {
            var existingBooking = _context.Bookings.Include(b => b.Tour).FirstOrDefault(b => b.Id == id);
            if (existingBooking == null) return;

            var tour = existingBooking.Tour;
            if (tour == null)
            {
                throw new ArgumentException("Tour không tồn tại!");
            }

            // Tính tổng số người trước đó
            int previousTotalPeople = existingBooking.NumberOfAdults + existingBooking.NumberOfChildren;

            // Tính tổng số người mới
            int newTotalPeople = bookingModel.NumberOfAdults + bookingModel.NumberOfChildren;

            // Cập nhật lại số chỗ còn lại của tour
            tour.AvailableSlots += previousTotalPeople; // Hoàn lại số chỗ từ booking cũ
            if (tour.AvailableSlots < newTotalPeople)
            {
                throw new InvalidOperationException("Số chỗ còn lại không đủ để cập nhật booking!");
            }
            tour.AvailableSlots -= newTotalPeople; // Trừ số chỗ từ booking mới

            // Cập nhật thông tin booking
            existingBooking.NumberOfAdults = bookingModel.NumberOfAdults;
            existingBooking.NumberOfChildren = bookingModel.NumberOfChildren;
            existingBooking.GuestName = bookingModel.GuestName ?? existingBooking.GuestName;
            existingBooking.GuestEmail = bookingModel.GuestEmail ?? existingBooking.GuestEmail;
            existingBooking.GuestPhoneNumber = bookingModel.GuestPhoneNumber ?? existingBooking.GuestPhoneNumber;
            existingBooking.GuestAddress = bookingModel.GuestAddress ?? existingBooking.GuestAddress;
            existingBooking.Notes = bookingModel.Notes;
            existingBooking.PaymentMethod = bookingModel.PaymentMethod;
            existingBooking.Status = bookingModel.Status;

            // Lưu thay đổi vào cơ sở dữ liệu
            _context.SaveChanges(); // Lưu lại booking và số chỗ còn lại của tour
        }

        public void Delete(string id)
        {
            var booking = _context.Bookings.Include(b => b.Tour).FirstOrDefault(b => b.Id == id);
            if (booking == null) return;

            var tour = booking.Tour;
            if (tour != null)
            {
                int totalPeople = booking.NumberOfAdults + booking.NumberOfChildren;
                tour.AvailableSlots += totalPeople; // Hoàn lại số chỗ cho tour
            }

            _context.Bookings.Remove(booking);

            // Lưu thay đổi vào cơ sở dữ liệu
            _context.SaveChanges(); // Lưu lại số chỗ đã được hoàn lại
        }

        public int GetBookingCount()
        {
            return _context.Bookings.Count(); // Đếm số lượng booking trong cơ sở dữ liệu
        }
    }
}
