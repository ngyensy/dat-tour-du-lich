using WebApi.Entities;

namespace WebApi.Models
{
    public class Itinerary
    {
        public int Id { get; set; }
        public string TourId { get; set; }
        public int DayNumber { get; set; }  // Ngày thứ mấy
        public string Title { get; set; }  // Tên lịch trình (ví dụ: "Sapa - Bản Cát Cát")
        public string Description { get; set; }  // Miêu tả lịch trình trong ngày
        public string Meals { get; set; }  // Các bữa ăn trong ngày (sáng, trưa, chiều)

        // Khóa ngoại tham chiếu đến tour
        public virtual Tour Tour { get; set; }
    }
}
