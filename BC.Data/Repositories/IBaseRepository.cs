using BC.Data.Models;
using BC.Data.Requests;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BC.Data.Repositories
{
    public interface IBaseRepository<T> where T: BaseModel
    {
        Task<IEnumerable<T>> GetList(PagingRequest request);

        Task<T> GetById(string id);

        Task Add(T item);

        Task<ReplaceOneResult> Update(string id, T item);

        Task<DeleteResult> Remove(string id);

        Task<long> CountAll();
    }
}
