using BC.Data.Models;
using BC.Data.Repositories;
using BC.Infrastructure.Hash;
using System.Threading.Tasks;

namespace BC.Auth
{
    public class Auth: IAuth
    {
        private readonly IAdminUserRepository _adminUserRepository;
        private readonly ICryptography _cryptography;

        public Auth(IAdminUserRepository adminUserRepository, ICryptography cryptography)
        {
            _adminUserRepository = adminUserRepository;
            _cryptography = cryptography;
        }

        public bool Authenticated(string dbPassword, string password)
        {
            return _cryptography.Encrypt(password).Equals(dbPassword);
        }

        public async Task RememberMe(AdminUser adminUser, string token)
        {
            adminUser.RememberToken = token;
            await _adminUserRepository.Update(adminUser.Id, adminUser);
        }

        public void Logout()
        {

        }

        private bool IsLogged(AdminUser adminUser, UseCredential authUser)
        {
            var isLogged = _cryptography.Encrypt(adminUser.Password).Equals(adminUser.Password);

            return _cryptography.Encrypt(adminUser.Password).Equals(adminUser.Password);
        }
    }
}
