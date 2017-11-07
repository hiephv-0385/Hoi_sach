namespace BC.Data.Models
{
    public class BookCategory: BaseModel
    {
        public string Name { get; set; }

        public int Sort { get; set; }

        public string Picture { get; set; }
    }
}
