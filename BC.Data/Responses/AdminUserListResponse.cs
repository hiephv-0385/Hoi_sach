using BC.Data.Models;
using System.Collections.Generic;

namespace BC.Data.Responses
{
    public class AdminUserListResponse: ListResponse
    {
        public IEnumerable<AdminUser> Data { get; set; }
    }
}
