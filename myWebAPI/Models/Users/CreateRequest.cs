using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using WebApi.Entities;

namespace WebApi.Models.Users
{
    public class CreateRequest
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        public string Role { get; set; } = "User"; 

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }


    }
}