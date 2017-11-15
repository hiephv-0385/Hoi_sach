using System.Collections.Generic;

namespace BC.Data.Models
{
    public class StoredBookModel
    {
        public Book Book { get; set; }

        public IEnumerable<BookImage> Images { get; set; }
    }
}
