using BC.Data.Models.CountryDomain;
using FluentValidation;

namespace BC.Data.Validations
{
    public class CountryValidator: AbstractValidator<Country>
    {
        public CountryValidator()
        {
            RuleFor(m => m.Name).NotEmpty();

            RuleFor(m => m.Code).NotEmpty();

            RuleFor(m => m.Sort).NotEmpty();
        }
    }
}