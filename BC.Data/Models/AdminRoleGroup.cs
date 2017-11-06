using MongoDB.Bson.Serialization.Attributes;

namespace BC.Web.Models
{
    public class AdminRoleGroup: BaseModel
    {
        [BsonId]
        public string GroupId { get; set; }

        [BsonId]
        public string RoleId { get; set; }
    }
}
