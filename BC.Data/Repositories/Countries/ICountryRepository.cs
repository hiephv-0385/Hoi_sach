using BC.Data.Models;

namespace BC.Data.Repositories
{
    public interface ICountryRepository: IBaseRepository<Country>
    {
        bool IsCountryCodeExisted(string code);
    }
}
