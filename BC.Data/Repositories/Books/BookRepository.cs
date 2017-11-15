using BC.Data.Models;
using BC.Data.Requests;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace BC.Data.Repositories
{
    public class BookRepository: BaseRepository<Book>, IBookRepository
    {
        public BookRepository(IBCContext<Book> context): base(context, DbCollectionNames.Book)
        {
        }

        public IList<BookModel> Search(BookRequest request)
        {
            var books = DbCollection.AsQueryable()
                .OrderBy(c => c.CreatedOn)
                .Skip(request.Offset ?? 0);
            if (request.Limit != null)
            {
                books = books.Take(request.Limit ?? 0);
            }
            if (!string.IsNullOrEmpty(request.Name))
            {
                books = books.Where(b => b.Name.Contains(request.Name));
            }
            if (!string.IsNullOrEmpty(request.CategoryId))
            {
                books = books.Where(b => b.BookCategory.Id == request.CategoryId);
            }

            return books.Select(b => new BookModel
            {
                Id = b.Id,
                Name = b.Name,
                PublishedYear = b.PublishedYear,
                IsActive = b.IsActive,
                CreatedOn = b.CreatedOn,
                Category = b.BookCategory,
                Author = b.Author
            }).ToList();
        }
    }
}
