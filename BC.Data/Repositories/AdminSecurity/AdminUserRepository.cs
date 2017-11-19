using BC.Data.Models;
using MongoDB.Driver;
using System;

namespace BC.Data.Repositories
{
    public class AdminUserRepository: BaseRepository<AdminUser>, IAdminUserRepository
    {
        public AdminUserRepository(IBCContext<AdminUser> context): base(context, DbCollectionNames.AdminUser)
        {
        }

        public bool IsEmailExisted(string email)
        {
            var filter = Builders<AdminUser>.Filter.Eq("Email", email);

            try
            {
                var user = DbCollection.Find(filter).FirstOrDefault();

                return user != null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public AdminUser GetByEmail(string email)
        {
            var filter = Builders<AdminUser>.Filter.Eq("Email", email);

            try
            {
                var user = DbCollection.Find(filter).FirstOrDefault();

                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
