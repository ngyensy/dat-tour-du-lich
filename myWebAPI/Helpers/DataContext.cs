using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using WebApi.Entities;

namespace WebApi.Helpers
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseMySql(Configuration.GetConnectionString("WebApiDatabase"),
                new MySqlServerVersion(new Version(8, 0, 21)));
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Tour> Tours { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Itinerary> Itineraries { get; set; }

        // Phương thức OnModelCreating để cấu hình quan hệ
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Cấu hình mối quan hệ 1-n giữa User và Booking
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User) // Một Booking thuộc về một User
                .WithMany(u => u.Bookings) // Một User có nhiều Booking
                .HasForeignKey(b => b.UserId) // Khóa ngoại trong bảng Booking
                .OnDelete(DeleteBehavior.SetNull); // Khi User bị xóa, UserId trong Booking sẽ là null

            // Cấu hình quan hệ giữa Tour và Itinerary
            modelBuilder.Entity<Tour>()
                .HasMany(t => t.Itineraries)
                .WithOne(i => i.Tour)
                .HasForeignKey(i => i.TourId);

            // Cấu hình quan hệ N-1 giữa Tour và Category
            modelBuilder.Entity<Tour>()
                .HasOne(t => t.Category)      // Một Tour có một Category
                .WithMany(c => c.Tour)      // Một Category có nhiều Tour
                .HasForeignKey(t => t.CategoryId)
                .OnDelete(DeleteBehavior.Restrict); // Không tự động xóa các Tour khi xóa Category

            base.OnModelCreating(modelBuilder);
        }
    }
}
