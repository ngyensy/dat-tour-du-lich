using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BookingController(IBookingService bookingService, IHttpContextAccessor httpContextAccessor)
        {
            _bookingService = bookingService;
            _httpContextAccessor = httpContextAccessor;

        }

        // GET: api/booking
        [HttpGet]
        public IActionResult GetAll()
        {
            var bookings = _bookingService.GetAll();
            return Ok(bookings);
        }

        // GET: api/booking/5
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var booking = _bookingService.GetById(id);
            if (booking == null)
                return NotFound();

            return Ok(booking);
        }

        // POST: api/booking
        [HttpPost]
        public IActionResult Create([FromBody] BookingModel bookingModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Kiểm tra xem người dùng đã đăng nhập chưa
            var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId != null)
            {
                // Nếu người dùng đã đăng nhập, cập nhật thông tin booking
                bookingModel.UserId = int.Parse(userId); // Chuyển đổi ID người dùng thành int
            }

            // Tạo booking
            _bookingService.Create(bookingModel);

            return Ok(new { message = "Booking created successfully." });
        }

        
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] BookingModel bookingModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _bookingService.Update(id, bookingModel);
            return Ok(new { message = "Booking updated successfully." });
        }

        // DELETE: api/booking/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _bookingService.Delete(id);
            return Ok(new { message = "Booking deleted successfully." });
        }
    }
}
