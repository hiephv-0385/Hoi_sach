using BC.Data.Models;
using System.Collections.Generic;

namespace BC.Data.Responses
{
    public class BookListResponse: ListResponse<BookDto>
    {
        public IList<BookDto> Dtos { get; set; }
    }
}
