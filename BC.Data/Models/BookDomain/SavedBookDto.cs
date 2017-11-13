using System.Collections.Generic;

namespace BC.Data.Models
{
    public class SavedBookDto: Book
    {
        public IList<BookImage> Images { get; set; }
    }
}
