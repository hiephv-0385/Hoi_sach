using BC.Data.Models;

namespace BC.Data.Repositories
{
    public class AdminUserRepository: BaseRepository<AdminUser>, IAdminUserRepository
    {
        public AdminUserRepository(IBCContext<AdminUser> context): base(context, DbCollectionNames.AdminUser)
        {
        }
    }
}
