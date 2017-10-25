namespace BC.Data.Models.AdminUserDomain
{
    public class AdminUserDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Avartar { get; set; } = string.Empty;

        public string Password { get; set; }
    }
}
