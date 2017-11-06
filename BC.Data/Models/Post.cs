using BC.Web.Enums;

namespace BC.Web.Models
{
    public class Post: BaseModel
    {
        public string Content { get; set; }

        public Member Member { get; set; }

        public PostAccessor PostAccessor { get; set; }
    }
}
