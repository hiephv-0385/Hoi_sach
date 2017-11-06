using BC.Web.Enums;

namespace BC.Web.Models
{
    public class BookCaseTransaction: BaseModel
    {
        public BookCaseItem BookCaseItem { get; set; }

        public TransactionType TransactionType { get; set; }

        public float Price { get; set; } = 0;

        public float InitDuration { get; set; }

        public TransportType TransportType { get; set; }
    }
}
