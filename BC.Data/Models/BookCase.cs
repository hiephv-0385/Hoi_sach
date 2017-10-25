namespace BC.Data.Models
{
    public class BookCase: BaseModel
    {
        public string Name { get; set; }

        public Member Member { get; set; }

        public string Introduction { get; set; }

        public string Logo { get; set; }

        public bool IsShared { get; set; }
    }
}
