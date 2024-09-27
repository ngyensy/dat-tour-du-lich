using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApi.Entities
{
    [Table("Users")]
    public class User
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Column("Name")]
        public string Name { get; set; }

        [Column("Email")]
        public string Email { get; set; }

        [Column("PhoneNumber")]
        public string PhoneNumber { get; set; }

        [Column("Address")]
        public string Address { get; set; }

        [Column("Role")]
        public string Role { get; set; } // Cập nhật kiểu dữ liệu từ Role sang string

        [Column("PasswordHash")]
        [JsonIgnore]
        public string PasswordHash { get; set; }
    }
}
