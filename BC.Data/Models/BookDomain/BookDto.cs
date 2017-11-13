namespace BC.Data.Models
{
    public class BookDto: BaseModel
    {
        public string Name { get; set; }

        public int PageCount { get; set; }

        public int PublishedYear { get; set; }

        public string BuyAddress { get; set; }
    }
}
