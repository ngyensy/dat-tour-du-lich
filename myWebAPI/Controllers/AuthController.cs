using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApi.Models.Users;
using WebApi.Services;

[ApiController]
[Route("v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IConfiguration _configuration;
    private readonly IConnectionMultiplexer _redis;

    public AuthController(IUserService userService, IConfiguration configuration, IConnectionMultiplexer redis)
    {
        _userService = userService;
        _configuration = configuration;
        _redis = redis;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest model)
    {
    // Tìm người dùng theo username
    var user = _userService.Authenticate(model.Username, model.Password);
    if (user == null)
        return Unauthorized(new { message = "mật khẩu không đúng " });

    // Tạo JWT token
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.Name, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role)
        }),
        Expires = DateTime.UtcNow.AddHours(2),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);
    var tokenString = tokenHandler.WriteToken(token);

    // Lưu token vào Redis
    var db = _redis.GetDatabase();
    db.StringSet($"jwt:{user.Id}", tokenString, TimeSpan.FromHours(2));

    return Ok(new
    {
        Id = user.Id,
        Email = user.Email,
        Name = user.Name,
        PhoneNumber = user.PhoneNumber,
        Role = user.Role,
        Token = tokenString
    });
    }   


    [Authorize]
    [HttpGet("secure-endpoint")]
    public IActionResult SecureEndpoint()
    {
        return Ok("You have access to this secure endpoint.");
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        var userId = User.FindFirstValue(ClaimTypes.Name); // Lấy ID người dùng từ token
        if (userId != null)
        {
            var db = _redis.GetDatabase();
            db.KeyDelete($"jwt:{userId}");
        }

        return Ok(new { message = "Logged out successfully" });
    }
}
