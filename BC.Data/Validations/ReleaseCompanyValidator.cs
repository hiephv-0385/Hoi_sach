using BC.Data.Models;
using FluentValidation;

namespace BC.Data.Validations
{
    public class ReleaseCompanyValidator: AbstractValidator<ReleaseCompany>
    {
        public ReleaseCompanyValidator()
        {
            RuleFor(r => r.Name).NotEmpty();

            RuleFor(r => r.Country).NotNull();
        }
    }
}
