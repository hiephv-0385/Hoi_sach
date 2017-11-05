using System;
using System.Collections.Generic;
using System.Text;

namespace BC.Data.Models.CountryDomain
{
    public class Country: BaseModel
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public int Sort { get; set; }

        public string Flag { get; set; }
    }
}
