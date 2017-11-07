namespace BC.Data.Models
{
    public class PostPicture: BaseModel
    {
        public Post Post { get; set; }

        public string ThumbPicture { get; set; }

        public string Picture { get; set; }

        public int Sort { get; set; }
    }
}
