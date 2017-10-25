using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using BC.Data.Models.AdminUserDomain;

namespace BC.Data.Repositories.AdminSecurity
{
    public interface IAdminUserRepository
    {
        Task<IEnumerable<AdminUser>> GetAllAdminUsers();

        Task<AdminUser> GetAdminUser(string id);

        Task AddAdminUser(AdminUser item);

        Task<ReplaceOneResult> UpdateAdminUser(string id, AdminUser item);

        Task<DeleteResult> RemoveAdminUser(string id);

        Task<DeleteResult> RemoveAllAdminUsers();
    }
}
