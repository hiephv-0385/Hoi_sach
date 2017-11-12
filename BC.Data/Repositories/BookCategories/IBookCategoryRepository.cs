using BC.Data.Models;
using BC.Data.Requests;
using System.Collections.Generic;

namespace BC.Data.Repositories
{
    public interface IBookCategoryRepository: IBaseRepository<BookCategory>
    {
        List<BookCategory> Search(BookCategoriesRequest request);
    }
}
