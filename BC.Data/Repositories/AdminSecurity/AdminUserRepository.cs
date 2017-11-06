using BC.Web.Models;
using BC.Web.Models.AdminUserDomain;
using BC.Web.Requests;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BC.Web.Repositories.AdminSecurity
{
    public class AdminUserRepository: IAdminUserRepository
    {
        private readonly BCContext _context = null;

        public AdminUserRepository(IOptions<Settings> settings)
        {
            _context = new BCContext(settings);
        }

        public async Task<IEnumerable<AdminUser>> GetAdminUsers(PagingRequest request)
        {
            try
            {
                return await _context.AdminUsers.Find(new BsonDocument())
                    .Skip(request.Offset)
                    .Limit(request.Limit)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<AdminUser> GetAdminUser(string id)
        {
            var filter = Builders<AdminUser>.Filter.Eq("Id", id);

            try
            {
                return await _context.AdminUsers
                                .Find(filter)
                                .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task AddAdminUser(AdminUser item)
        {
            try
            {
                await _context.AdminUsers.InsertOneAsync(item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReplaceOneResult> UpdateAdminUser(string id, AdminUser updatedItem)
        {
            try
            {
                return await _context.AdminUsers
                            .ReplaceOneAsync(n => n.Id.Equals(id)
                                            , updatedItem
                                            , new UpdateOptions { IsUpsert = true });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DeleteResult> RemoveAdminUser(string id)
        {
            try
            {
                return await _context.AdminUsers.DeleteOneAsync(
                     Builders<AdminUser>.Filter.Eq("Id", id));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DeleteResult> RemoveAllAdminUsers()
        {
            try
            {
                return await _context.AdminUsers.DeleteManyAsync(new BsonDocument());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<long> CountAll()
        {
            return await _context.AdminUsers.CountAsync(new BsonDocument());
        }
    }
}
