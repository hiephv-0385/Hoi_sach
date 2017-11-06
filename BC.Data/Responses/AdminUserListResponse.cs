using BC.Web.Models.AdminUserDomain;
using System.Collections.Generic;

namespace BC.Web.Responses
{
    public class AdminUserListResponse
    {
        public long Count { get; set; }

        public IEnumerable<AdminUser> Data { get; set; }
    }
}
