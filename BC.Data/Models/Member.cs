using BC.Data.Enums;
using BC.Data.Models.CountryDomain;
using System;

namespace BC.Data.Models
{
    public class Member: BaseModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public DateTime Birthday { get; set; }

        public Country Country { get; set; }

        public Sex Sex { get; set; }

        public string Password { get; set; }
    }
}
