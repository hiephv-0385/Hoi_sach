using BC.Data.Models;
using BC.Data.Requests;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace BC.Data.Repositories.Countries
{
    public class CountryRepository: ICountryRepository
    {
        private readonly BCContext _context = null;

        public CountryRepository(IOptions<Settings> settings)
        {
            _context = new BCContext(settings);
        }

        public async Task<IEnumerable<Country>> GetCountries(PagingRequest request)
        {
            try
            {
                return await _context.Countries.Find(new BsonDocument())
                    .SortBy(c => c.Sort)
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
            return await _context.Countries.CountAsync(new BsonDocument());
        }
    }
}
