using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using BC.Web.Models.AdminUserDomain;
using BC.Web.Requests;

namespace BC.Web.Repositories.AdminSecurity
{
    public interface IAdminUserRepository
    {
        Task<IEnumerable<AdminUser>> GetAdminUsers(PagingRequest request);

        Task<AdminUser> GetAdminUser(string id);

        Task AddAdminUser(AdminUser item);

        Task<ReplaceOneResult> UpdateAdminUser(string id, AdminUser item);

        Task<DeleteResult> RemoveAdminUser(string id);

        Task<DeleteResult> RemoveAllAdminUsers();

        Task<long> CountAll();
    }
}
