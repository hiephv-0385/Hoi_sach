using BC.Data.Enums;

namespace BC.Data.Models
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
