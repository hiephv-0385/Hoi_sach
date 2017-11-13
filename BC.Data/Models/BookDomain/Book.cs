namespace BC.Data.Models
{
    public class Book: BaseModel
    {
        public string Name { get; set; }

        public int PageCount { get; set; } = 0;

        public int PublishedYear { get; set; }

        public string Summary { get; set; }

        public string BuyAddress { get; set; }

        public Publisher Publisher { get; set; }

        public ReleaseCompany ReleaseCompany { get; set; }

        public Author Author { get; set; }

        public BookCategory BookCategory { get; set; }
    }
}
