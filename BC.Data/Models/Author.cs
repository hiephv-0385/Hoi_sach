using BC.Data.Models;
using System;

namespace BC.Data.Models
{
    public class Author: BaseModel
    {
        public string FullName { get; set; }

        public DateTime Birthday { get; set; }

        public string Picture { get; set; }

        public Country Country { get; set; }
    }
}
