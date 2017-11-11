using BC.Data.Models;
using FluentValidation;

namespace BC.Data.Validations
{
    public class PublisherValidator: AbstractValidator<Publisher>
    {
        public PublisherValidator()
        {
            RuleFor(p => p.Name).NotEmpty();

            RuleFor(p =>p.Country).NotNull();
        }
    }
}
