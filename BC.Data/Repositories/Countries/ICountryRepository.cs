using BC.Web.Requests;
using BC.Web.Models.CountryDomain;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BC.Web.Repositories.Countries
{
    public interface ICountryRepository
    {
        Task<IEnumerable<Country>> GetCountries(PagingRequest request);

        Task<Country> GetCountry(string id);

        Task AddCountry(Country item);

        Task<ReplaceOneResult> UpdateCountry(string id, Country item);

        Task<DeleteResult> RemoveCountry(string id);

        Task<long> CountAll();
    }
}
