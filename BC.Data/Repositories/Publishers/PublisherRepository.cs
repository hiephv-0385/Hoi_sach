using BC.Data.Models;

namespace BC.Data.Repositories
{
    public class PublisherRepository: BaseRepository<Publisher>, IPublisherRepository
    {
        public PublisherRepository(IBCContext<Publisher> context)
            : base(context, DbCollectionNames.Publisher)
        {
        }
    }
}
