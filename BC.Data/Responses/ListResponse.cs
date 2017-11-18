
using BC.Data.Models;
using System.Collections.Generic;

namespace BC.Data.Responses
{
    public class ListResponse<T> where T: BaseModel
    {
        public long Count { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}
