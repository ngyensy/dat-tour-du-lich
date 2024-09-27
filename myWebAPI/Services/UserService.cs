using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Users;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using System.Net.Mail;

namespace WebApi.Services
{
    public interface IUserService
    {
        IEnumerable<User> GetAll();
        User GetById(int id);
        void Create(CreateRequest model);
        void Update(int id, UpdateRequest model);
        void Delete(int id);
        User Authenticate(string email, string password);
    }

    public class UserService : IUserService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public UserService(
            DataContext context,
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;

        }

        public User Authenticate(string username, string password)
        {
            // Kiểm tra xem username là email hay số điện thoại
            var user = _context.Users.SingleOrDefault(x =>
                x.Email == username || x.PhoneNumber == username);

            // Nếu không tìm thấy người dùng
            if (user == null)
                throw new AppException("Tên đăng nhập không tồn tại");

            // Nếu không tìm thấy hoặc mật khẩu không đúng
            if (user == null || !VerifyPasswordHash(password, user.PasswordHash))
                return null;

            return user;
        }
        private bool VerifyPasswordHash(string password, string storedHash)
        {
            // Kiểm tra mật khẩu với hash trong database
            return BCrypt.Net.BCrypt.Verify(password, storedHash);
        }

        // Helper method to validate email format
        private bool IsValidEmail(string email)
        {
            try
            {
                var mailAddress = new MailAddress(email);
                return true;
            }
            catch
            {
                return false;
            }
        }

        // Helper method to validate phone number (10 digits)
        private bool IsValidPhoneNumber(string phoneNumber)
        {
            return !string.IsNullOrEmpty(phoneNumber) && phoneNumber.All(char.IsDigit) && phoneNumber.Length == 10;
        }

        public IEnumerable<User> GetAll()
            {
                return _context.Users;
            }

            public User GetById(int id)
            {
                return getUser(id);
            }

            public void Create(CreateRequest model)
            {
                // validate
                if (_context.Users.Any(x => x.Email == model.Email))
                    throw new AppException("email '" + model.Email + "' đã tồn tại");

                  // validate password
                if (string.IsNullOrWhiteSpace(model.Password) || model.Password.Length < 8)
                    throw new AppException("Mật khẩu phải có ít nhất 8 ký tự");
                
                // validate phone number (10 digits)
                if (!IsValidPhoneNumber(model.PhoneNumber))
                    throw new AppException("Số điện thoại phải có đúng 10 chữ số");

                // map model to new user object
                var user = _mapper.Map<User>(model);

                // hash password
                user.PasswordHash = BCryptNet.HashPassword(model.Password);

                // save user
                _context.Users.Add(user);
                _context.SaveChanges();
            }

            public void Update(int id, UpdateRequest model)
            {
                var user = getUser(id);

                // validate
                if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
                    throw new AppException("User with the email '" + model.Email + "' already exists");

                // hash password if it was entered
                if (!string.IsNullOrEmpty(model.Password))
                    user.PasswordHash = BCryptNet.HashPassword(model.Password);

                // copy model to user and save
                _mapper.Map(model, user);
                _context.Users.Update(user);
                _context.SaveChanges();
            }

            public void Delete(int id)
            {
                var user = getUser(id);
                _context.Users.Remove(user);
                _context.SaveChanges();
            }

            // helper methods

            private User getUser(int id)
            {
                var user = _context.Users.Find(id);
                if (user == null) throw new KeyNotFoundException("User not found");
                return user;
            }
        }
    
}