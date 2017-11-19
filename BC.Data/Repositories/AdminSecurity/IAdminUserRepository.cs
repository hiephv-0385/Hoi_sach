using BC.Data.Models;

namespace BC.Data.Repositories
{
    public interface IAdminUserRepository: IBaseRepository<AdminUser>
    {
        bool IsEmailExisted(string email);

        AdminUser GetByEmail(string email);
    }
}
