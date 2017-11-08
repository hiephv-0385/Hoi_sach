using Microsoft.Extensions.Options;
using BC.Data.Models;
using MongoDB.Driver;

namespace BC.Data
{
    public class BCContext<T>: IBCContext<T> where T: BaseModel
    {
        private readonly IMongoDatabase _database = null;

        public BCContext(IOptions<Settings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
                _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<T> GetDbColection(string collectionName)
        {
            return _database.GetCollection<T>(collectionName);
        }
    }
}
