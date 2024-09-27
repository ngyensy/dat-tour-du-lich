using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    [Table("Tours")]
    public class Tour
    {
        [Key]
        [Column("Id")]
        public string Id { get; set; }

        [Column("Name")]
        public string Name { get; set; }

        [Column("Description")]
        public string Description { get; set; }

        [Column("Duration")]
        public int Duration { get; set; }

        // Thêm giá cho người lớn và trẻ em
        [Column("Price")]
        public decimal Price { get; set; } // Giá cho người lớn

        [Column("ChildPrice")]
        public decimal ChildPrice { get; set; } // Giá cho trẻ em

        [Column("DepartureLocation")]
        public string DepartureLocation { get; set; } // Nơi khởi hành

        [Column("Destination")]
        public string Destination { get; set; } // Điểm đến

        [Column("StartDate")]
        public DateTime StartDate { get; set; }

        [Column("EndDate")]
        public DateTime EndDate { get; set; }

        [Column("AvailableSlots")]
        public int AvailableSlots { get; set; }

        [Column("IsActive")]
        public bool IsActive { get; set; } = true;

        [Column("Image")]
        public string Image { get; set; }

        // Foreign key to Category
        [Column("CategoryId")]
        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; } // Navigation property
    }
}
