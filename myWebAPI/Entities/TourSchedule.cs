using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using WebApi.Entities;

[Table("TourSchedules")]
public class TourSchedule
{
    [Key]
    public int Id { get; set; } // ID của lịch khởi hành

    [ForeignKey("Tour")]
    public string TourId { get; set; } // Liên kết đến Tour
    public Tour Tour { get; set; } // Đối tượng Tour liên kết

    [Column("StartDate")]
    public DateTime StartDate { get; set; } // Ngày khởi hành

    [Column("EndDate")]
    public DateTime EndDate { get; set; }    // Ngày về

    [Column("AvailableSlots")]
    public int AvailableSlots { get; set; } // Số chỗ còn trống cho ngày khởi hành
}
