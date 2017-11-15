using BC.Data.Models;
using BC.Data.Requests;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BC.Data.Repositories
{
    public class BaseRepository<T>: IBaseRepository<T> where T: BaseModel
    {
        private readonly IMongoCollection<T> _dbCollection;

        public BaseRepository(IBCContext<T> context, string collectionName)
        {
            _dbCollection = context.GetDbColection(collectionName);
        }

        protected IMongoCollection<T> DbCollection
        {
            get
            {
                return _dbCollection;
            }
        }

        public async Task<IEnumerable<T>> GetList(PagingRequest request)
        {
            try
            {
                return await _dbCollection.Find(new BsonDocument())
                    .SortByDescending(u => u.CreatedOn)
                    .Skip(request.Offset ?? 0)
                    .Limit(request.Limit)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            try
            {
                return await _dbCollection.Find(new BsonDocument())
                    .SortByDescending(u => u.CreatedOn)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<T> GetById(string id)
        {
            var filter = Builders<T>.Filter.Eq("Id", id);

            try
            {
                return await _dbCollection
                                .Find(filter)
                                .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Add(T item)
        {
            try
            {
                await _dbCollection.InsertOneAsync(item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task AddMany(IEnumerable<T> items)
        {
            try
            {
                await _dbCollection.InsertManyAsync(items);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReplaceOneResult> Update(string id, T updatedItem)
        {
            try
            {
                return await _dbCollection
                            .ReplaceOneAsync(n => n.Id.Equals(id)
                                            , updatedItem
                                            , new UpdateOptions { IsUpsert = true });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DeleteResult> Remove(string id)
        {
            try
            {
                return await _dbCollection.DeleteOneAsync(
                     Builders<T>.Filter.Eq("Id", id));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<long> CountAll()
        {
            return await _dbCollection.CountAsync(new BsonDocument());
        }
    }
}
