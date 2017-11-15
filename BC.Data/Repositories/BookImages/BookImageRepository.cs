using BC.Data.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BC.Data.Repositories
{
    public class BookImageRepository: BaseRepository<BookImage>, IBookImageRepository
    {
        private readonly IBCContext<BookImage> _context;

        public BookImageRepository(IBCContext<BookImage> context): base(context, DbCollectionNames.BookImage)
        {
            _context = context;
        }

        public async Task<IEnumerable<BookImage>> GetImagesByBookId(string bookId)
        {
            try
            {
                var filter = Builders<BookImage>.Filter.Eq("BookId", bookId);
                return await DbCollection.Find(filter).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<DeleteResult> DeleteImagesByBookId(string bookId)
        {
            try
            {
                var filter = Builders<BookImage>.Filter.In("BookId", bookId);
                return await DbCollection.DeleteManyAsync(filter);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
