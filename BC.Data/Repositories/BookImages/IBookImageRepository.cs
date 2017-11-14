using BC.Data.Models;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace BC.Data.Repositories
{
    public interface IBookImageRepository: IBaseRepository<BookImage>
    {
        Task<DeleteResult> DeleteImagesByBookId(string bookId);
    }
}
