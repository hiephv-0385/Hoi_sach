using BC.Data.Models;
using MongoDB.Driver;

namespace BC.Data
{
    public interface IBCContext<T> where T: BaseModel
    {
        IMongoCollection<T> GetDbColection(string collectionName);
    }
}
