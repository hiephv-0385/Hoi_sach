using Microsoft.Extensions.Options;
using BC.Web.Models;
using MongoDB.Driver;
using BC.Web.Models.AdminUserDomain;
using BC.Web.Models.CountryDomain;

namespace BC.Web
{
    public class BCContext
    {
        private readonly IMongoDatabase _database = null;

        public BCContext(IOptions<Settings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
                _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<AdminRoleGroup> AdminRoleGroups
        {
            get
            {
                return _database.GetCollection<AdminRoleGroup>("AdminRoleGroup");
            }
        }

        public IMongoCollection<AdminUser> AdminUsers
        {
            get
            {
                return _database.GetCollection<AdminUser>("AdminUser");
            }
        }

        public IMongoCollection<AdminUserGroup> AdminUserGroups
        {
            get
            {
                return _database.GetCollection<AdminUserGroup>("AdminUserGroup");
            }
        }

        public IMongoCollection<AdminUserRole> AdminUserRoles
        {
            get
            {
                return _database.GetCollection<AdminUserRole>("AdminUserRole");
            }
        }

        public IMongoCollection<Author> Authors
        {
            get
            {
                return _database.GetCollection<Author>("Author");
            }
        }

        public IMongoCollection<Book> Books
        {
            get
            {
                return _database.GetCollection<Book>("Book");
            }
        }

        public IMongoCollection<BookCase> BookCases
        {
            get
            {
                return _database.GetCollection<BookCase>("BookCase");
            }
        }

        public IMongoCollection<BookCaseItem> BookCaseItems
        {
            get
            {
                return _database.GetCollection<BookCaseItem>("BookCaseItem");
            }
        }

        public IMongoCollection<BookCaseTransaction> BookCaseTransactions
        {
            get
            {
                return _database.GetCollection<BookCaseTransaction>("BookCaseTransaction");
            }
        }

        public IMongoCollection<BookCaseTransactionHistory> BookCaseTransactionHistories
        {
            get
            {
                return _database.GetCollection<BookCaseTransactionHistory>("BookCaseTransactionHistory");
            }
        }

        public IMongoCollection<BookCategory> BookCategories
        {
            get
            {
                return _database.GetCollection<BookCategory>("BookCategory");
            }
        }

        public IMongoCollection<Country> Countries
        {
            get
            {
                return _database.GetCollection<Country>("Country");
            }
        }

        public IMongoCollection<Language> Languages
        {
            get
            {
                return _database.GetCollection<Language>("Language");
            }
        }

        public IMongoCollection<Member> Members
        {
            get
            {
                return _database.GetCollection<Member>("Member");
            }
        }

        public IMongoCollection<Post> Posts
        {
            get
            {
                return _database.GetCollection<Post>("Post");
            }
        }

        public IMongoCollection<PostComment> PostComments
        {
            get
            {
                return _database.GetCollection<PostComment>("PostComment");
            }
        }

        public IMongoCollection<PostLike> PostLikes
        {
            get
            {
                return _database.GetCollection<PostLike>("PostLike");
            }
        }

        public IMongoCollection<PostPicture> PostPictures
        {
            get
            {
                return _database.GetCollection<PostPicture>("PostPicture");
            }
        }

        public IMongoCollection<Publisher> Publishers
        {
            get
            {
                return _database.GetCollection<Publisher>("Publisher");
            }
        }

        public IMongoCollection<ReleaseCompany> ReleaseCompanies
        {
            get
            {
                return _database.GetCollection<ReleaseCompany>("ReleaseCompany");
            }
        }

        public IMongoCollection<SharedPost> SharedPosts
        {
            get
            {
                return _database.GetCollection<SharedPost>("SharedPost");
            }
        }
    }
}
