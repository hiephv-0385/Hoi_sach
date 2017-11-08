using BC.Data.Models;

namespace BC.Data.Repositories
{
    public class AuthorRepository: BaseRepository<Author>, IAuthorRepository
    {
        public AuthorRepository(IBCContext<Author> context): base(context, DbCollectionNames.Author)
        {
        }
    }
}
