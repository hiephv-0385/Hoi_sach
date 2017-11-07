using BC.Data.Enums;

namespace BC.Data.Models
{
    public class Post: BaseModel
    {
        public string Content { get; set; }

        public Member Member { get; set; }

        public PostAccessor PostAccessor { get; set; }
    }
}
