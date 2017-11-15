using BC.Data.Models;
using System.Collections.Generic;

namespace BC.Data.Responses
{
    public class BookListResponse: ListResponse<BookModel>
    {
        public IList<BookModel> Books { get; set; }
    }
}
