using BC.Data.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BC.Data.Repositories
{
    public interface IBookImageRepository: IBaseRepository<BookImage>
    {
        Task<IEnumerable<BookImage>> GetImagesByBookId(string bookId);

        Task<DeleteResult> DeleteImagesByBookId(string bookId);
    }
}
