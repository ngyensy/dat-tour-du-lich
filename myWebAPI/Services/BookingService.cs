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
    }

    namespace WebApi.Services
    {
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
                // Truy vấn Booking cùng với Tour bằng Include
                var booking = _context.Bookings
                                    .Include(b => b.Tour) // Include để load thông tin Tour
                                    .FirstOrDefault(b => b.Id == id); // Lấy booking theo id

                return _mapper.Map<BookingModel>(booking);
            }

            public void Create(BookingModel bookingModel)
            {
                // Kiểm tra xem tour có tồn tại không
                var tour = _context.Tours.FirstOrDefault(t => t.Id == bookingModel.TourId);
                if (tour == null)
                {
                    throw new ArgumentException("Tour does not exist.");
                }

                // Nếu có UserId, đảm bảo người dùng tồn tại
                if (bookingModel.UserId.HasValue)
                {
                    var user = _context.Users.Find(bookingModel.UserId.Value);
                    if (user == null)
                    {
                        throw new ArgumentException("User does not exist.");
                    }
                }

                // Chuyển đổi BookingModel thành Booking entity
                var bookingEntity = _mapper.Map<Booking>(bookingModel);

                // Tạo BookingId ngẫu nhiên
                bookingEntity.Id = IdGenerator.GenerateBookingId(10);

                // Chỉnh sửa thời gian đặt chỗ, loại bỏ mili giây
                bookingEntity.BookingDate = bookingModel.BookingDate.AddMilliseconds(-bookingModel.BookingDate.Millisecond);

                // Thêm entity vào cơ sở dữ liệu
                _context.Bookings.Add(bookingEntity);

                // Lưu thay đổi vào cơ sở dữ liệu
                _context.SaveChanges();
            }

            public void Update(string id, BookingModel bookingModel)
            {
                var existingBooking = _context.Bookings.Include(b => b.Tour).FirstOrDefault(b => b.Id == id);
                if (existingBooking == null) return;

                // Áp dụng các thay đổi từ bookingModel
                _mapper.Map(bookingModel, existingBooking);

                // Cập nhật thông tin khách nếu UserId là null
                if (bookingModel.UserId == null)
                {
                    existingBooking.GuestName = bookingModel.GuestName;
                    existingBooking.GuestEmail = bookingModel.GuestEmail;
                    existingBooking.GuestPhoneNumber = bookingModel.GuestPhoneNumber;
                    existingBooking.GuestAddress = bookingModel.GuestAddress;
                }

                // Tính toán lại tổng giá
                existingBooking.TotalPrice = (existingBooking.NumberOfAdults * existingBooking.Tour.Price) +
                                              (existingBooking.NumberOfChildren * existingBooking.Tour.ChildPrice);

                // Cập nhật booking trong cơ sở dữ liệu
                _context.Bookings.Update(existingBooking);
                _context.SaveChanges();
            }

            public void Delete(string id)
            {
                var booking = _context.Bookings.Find(id);
                if (booking == null) return;

                _context.Bookings.Remove(booking);
                _context.SaveChanges();
            }
        }
    }
}
