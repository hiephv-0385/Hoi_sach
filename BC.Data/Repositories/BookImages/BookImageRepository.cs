using BC.Data.Models;

namespace BC.Data.Repositories
{
    public class BookImageRepository: BaseRepository<BookImage>, IBookImageRepository
    {
        public BookImageRepository(IBCContext<BookImage> context): base(context, DbCollectionNames.BookImage)
        {
        }
    }
}
