using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    [Table("Itineraries")]
    public class Itinerary
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Column("TourId")]
        public string TourId { get; set; }

        [ForeignKey("TourId")]
        public Tour Tour { get; set; }  // Liên kết với bảng Tour

        [Column("DayNumber")]
        public int DayNumber { get; set; }  // Ngày trong lịch trình (ví dụ: Ngày 1, Ngày 2)

        [Column("Location")]
        public string Location { get; set; }  // Địa điểm

        [Column("Meals")]
        public string Meals { get; set; }  // Số bữa ăn trong ngày (sáng, trưa, chiều)

        [Column("Description")]
        public string Description { get; set; }  // Mô tả chi tiết cho ngày đó (hoạt động, tham quan, v.v.)
    }
}
