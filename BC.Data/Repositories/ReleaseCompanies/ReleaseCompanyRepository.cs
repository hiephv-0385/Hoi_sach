using BC.Data.Models;

namespace BC.Data.Repositories
{
    public class ReleaseCompanyRepository: BaseRepository<ReleaseCompany>, IReleaseCompanyRepository
    {
        public ReleaseCompanyRepository(IBCContext<ReleaseCompany> context):
            base(context, DbCollectionNames.ReleaseCompany)
        {

        }
    }
}
