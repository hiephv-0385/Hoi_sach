namespace BC.Data.Models
{
    public class BookModel: BaseModel
    {
        public string Name { get; set; }

        public int PublishedYear { get; set; }

        public BookCategory Category { get; set; }

        public Author Author { get; set; }
    }
}
