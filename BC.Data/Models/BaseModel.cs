using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace BC.Web.Models
{
    public class BaseModel
    {
        [StringLength(24, MinimumLength = 24)]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public DateTime UpdatedOn { get; set; } = DateTime.Now;

        public DateTime CreatedOn { get; set; } = DateTime.Now;

        public bool IsActive { get; set; } = true;
    }
}
