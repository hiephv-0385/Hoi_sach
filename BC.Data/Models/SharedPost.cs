namespace BC.Data.Models
{
    public class SharedPost: BaseModel
    {
        public Member Member { get; set; }

        public Post Post { get; set; }
    }
}
