namespace BC.Data.Models
{
    public class AdminUserDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Avatar { get; set; } = string.Empty;

        public string Password { get; set; }

        public bool IsActive { get; set; }
    }
}
