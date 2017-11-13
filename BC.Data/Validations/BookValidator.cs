using BC.Data.Models;
using FluentValidation;

namespace BC.Data.Validations
{
    public class BookValidator: AbstractValidator<Book>
    {
        public BookValidator()
        {
            RuleFor(b => b.Name).NotEmpty();

            RuleFor(b => b.Author).NotNull();

            RuleFor(b => b.BookCategory).NotNull();

            RuleFor(b => b.Publisher).NotNull();
        }
    }
}
