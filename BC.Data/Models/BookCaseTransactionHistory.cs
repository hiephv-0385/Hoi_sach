using BC.Web.Enums;
using System;

namespace BC.Web.Models
{
    public class BookCaseTransactionHistory: BaseModel
    {
        public BookCaseTransaction BookCaseTransaction { get; set; }

        public Member Reader { get; set; }

        public float PriceAgreement { get; set; }

        public string Message { get; set; }

        public DateTime StartDate { get; set; } = DateTime.Now;

        public DateTime EndDate { get; set; } = DateTime.Now;

        public TransportType TransportType { get; set; }

        public bool IsAgree { get; set; }
    }
}
