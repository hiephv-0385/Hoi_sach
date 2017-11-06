namespace BC.Web.Models
{
    public class BookCaseItem
    {
        public BookCase MyBookCase { get; set; }

        public Book Book { get; set; }

        public int Sort { get; set; }

        public bool IsUesed { get; set; }
    }
}
