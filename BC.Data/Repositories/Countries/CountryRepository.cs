using BC.Data.Models;

namespace BC.Data.Repositories.Countries
{
    public class CountryRepository: BaseRepository<Country>, ICountryRepository
    {
        public CountryRepository(IBCContext<Country> context): base(context, DbCollectionNames.Country)
        {
        }
    }
}
