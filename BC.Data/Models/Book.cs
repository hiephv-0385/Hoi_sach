namespace BC.Web.Models
{
    public class Book: BaseModel
    {
        public string Name { get; set; }

        public string Picture { get; set; }

        public int PageCount { get; set; }

        public string Summary { get; set; }

        public string BuyAddress { get; set; }

        public Publisher Publisher { get; set; }

        public int PublishedYear { get; set; }

        public ReleaseCompany GetReleaseCompany { get; set; }

        public Language Language { get; set; }

        public Author Author { get; set; }

        public BookCategory BookCategory { get; set; }
    }
}
