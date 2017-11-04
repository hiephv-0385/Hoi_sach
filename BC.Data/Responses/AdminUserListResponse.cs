using BC.Data.Models.AdminUserDomain;
using System.Collections.Generic;

namespace BC.Data.Responses
{
    public class AdminUserListResponse
    {
        public long Count { get; set; }

        public IEnumerable<AdminUser> Data { get; set; }
    }
}
