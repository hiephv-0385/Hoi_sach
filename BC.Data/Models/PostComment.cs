namespace BC.Web.Models
{
    public class PostComment: BaseModel
    {
        public Member Member { get; set; }

        public Post Post { get; set; }

        public string Content { get; set; }
    }
}
