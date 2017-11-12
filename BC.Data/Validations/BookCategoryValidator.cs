using BC.Data.Models;
using FluentValidation;

namespace BC.Data.Validations
{
    public class BookCategoryValidator: AbstractValidator<BookCategory>
    {
        public BookCategoryValidator()
        {
            RuleFor(c => c.Name).NotEmpty();

            RuleFor(c => c.Sort).NotEmpty().GreaterThanOrEqualTo(1);
        }
    }
}
