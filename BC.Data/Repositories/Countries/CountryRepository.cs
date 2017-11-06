using BC.Web.Models.CountryDomain;
using BC.Web.Requests;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BC.Web.Repositories.Countries
{
    public class CountryRepository: ICountryRepository
    {
        private readonly BCContext _context = null;

        public CountryRepository(BCContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Country>> GetCountries(PagingRequest request)
        {
            try
            {
                return await _context.Countries.Find(new BsonDocument())
                    .Skip(request.Offset)
                    .Limit(request.Limit)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Country> GetCountry(string id)
        {
            var filter = Builders<Country>.Filter.Eq("Id", id);

            try
            {
                return await _context.Countries
                                .Find(filter)
                                .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task AddCountry(Country item)
        {
            try
            {
                await _context.Countries.InsertOneAsync(item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReplaceOneResult> UpdateCountry(string id, Country item)
        {
            try
            {
                return await _context.Countries
                            .ReplaceOneAsync(n => n.Id.Equals(id)
                                            , item
                                            , new UpdateOptions { IsUpsert = true });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DeleteResult> RemoveCountry(string id)
        {
            try
            {
                return await _context.Countries.DeleteOneAsync(
                     Builders<Country>.Filter.Eq("Id", id));
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
