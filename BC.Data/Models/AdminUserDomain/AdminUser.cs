using MongoDB.Bson.Serialization.Attributes;

namespace BC.Data.Models
{
    [BsonIgnoreExtraElements]
    public class AdminUser: BaseModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Avatar { get; set; } = string.Empty;
       
        public string Password { get; set; }

        public string RememberToken { get; set; }

        public bool IsSupperUser { get; set; }
    }
}
