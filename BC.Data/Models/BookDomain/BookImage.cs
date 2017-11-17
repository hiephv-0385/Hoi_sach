namespace BC.Data.Models
{
    public class BookImage: BaseModel
    {
        public string BookId { get; set; }

        public int Sort { get; set; }

        public string ImageUrl { get; set; }
    }
}
