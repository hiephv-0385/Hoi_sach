using BC.Data.Models;
using System.Threading.Tasks;

namespace BC.Auth
{
    public interface IAuth
    {
        bool Authenticated(string dbPassword, string password);

        Task RememberMe(AdminUser adminUser, string token);

        void Logout();
    }
}
