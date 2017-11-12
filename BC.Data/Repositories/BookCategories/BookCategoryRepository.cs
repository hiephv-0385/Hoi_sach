using BC.Data.Models;

namespace BC.Data.Repositories
{
    public class BookCategoryRepository: BaseRepository<BookCategory>, IBookCategoryRepository
    {
        public BookCategoryRepository(IBCContext<BookCategory> context)
            :base(context, DbCollectionNames.BookCategory)
        {

        }
    }
}
