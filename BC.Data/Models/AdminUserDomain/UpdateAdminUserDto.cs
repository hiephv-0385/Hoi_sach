namespace BC.Data.Models
{
    public class UpdateAdminUserDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Avatar { get; set; } = string.Empty;

        public bool IsActive { get; set; }
    }
}
