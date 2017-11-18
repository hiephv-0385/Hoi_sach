using BC.Data.Models;
using MongoDB.Driver;
using System;

namespace BC.Data.Repositories
{
    public class CountryRepository: BaseRepository<Country>, ICountryRepository
    {
        public CountryRepository(IBCContext<Country> context): base(context, DbCollectionNames.Country)
        {
        }

        public bool IsCountryCodeExisted(string code)
        {
            var filter = Builders<Country>.Filter.Eq("Code", code);

            try
            {
                var existedCountry = DbCollection.Find(filter).FirstOrDefault();

                return existedCountry != null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
