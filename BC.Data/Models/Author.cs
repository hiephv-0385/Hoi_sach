using BC.Web.Models.CountryDomain;
using System;

namespace BC.Web.Models
{
    public class Author: BaseModel
    {
        public string FullName { get; set; }

        public DateTime Birthday { get; set; }

        public string Picture { get; set; }

        public Country Country { get; set; }
    }
}
