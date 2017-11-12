using BC.Data.Models;
using BC.Data.Requests;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BC.Data.Repositories
{
    public class BookCategoryRepository: BaseRepository<BookCategory>, IBookCategoryRepository
    {
        private readonly IBCContext<BookCategory> _context;
        public BookCategoryRepository(IBCContext<BookCategory> context)
            :base(context, DbCollectionNames.BookCategory)
        {
            _context = context;
        }

        public List<BookCategory> Search(BookCategoriesRequest request)
        {
            try
            {
                var categories = DbCollection.AsQueryable()
                    .OrderBy(c => c.Sort)
                    .Skip(request.Offset ?? 0);

                if (request.Limit != null)
                {
                    categories = categories.Take(request.Limit ?? 0);
                }

                if (request.ParentId != null)
                {
                    categories = categories.Where(c => c.Parent.Id != null && c.Parent.Id == request.ParentId);
                }
                
                return categories.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
