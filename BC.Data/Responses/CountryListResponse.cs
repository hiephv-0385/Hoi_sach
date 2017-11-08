using BC.Data.Models;
using System.Collections.Generic;

namespace BC.Data.Responses
{
    public class CountryListResponse: ListResponse
    {
        public IEnumerable<Country> Data { get; set; }
    }
}
