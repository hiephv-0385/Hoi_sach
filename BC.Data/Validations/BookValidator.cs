using BC.Data.Models;
using FluentValidation;

namespace BC.Data.Validations
{
    public class BookValidator: AbstractValidator<StoredBookModel>
    {
        public BookValidator()
        {
            RuleFor(b => b.Book.Name).NotEmpty();

            RuleFor(b => b.Book.Author).NotNull();

            RuleFor(b => b.Book.BookCategory).NotNull();

            RuleFor(b => b.Book.Publisher).NotNull();
        }
    }
}
