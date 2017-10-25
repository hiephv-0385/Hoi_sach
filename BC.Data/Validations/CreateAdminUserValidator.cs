using BC.Data.Models.AdminUserDomain;
using FluentValidation;

namespace BC.Data.Validations
{
    public class CreateAdminUserValidator: AbstractValidator<AdminUserDto>
    {
        public CreateAdminUserValidator()
        {
            RuleFor(m => m.FirstName).NotEmpty();

            RuleFor(m => m.LastName).NotEmpty();

            RuleFor(m => m.Email).NotEmpty().EmailAddress();

            RuleFor(m => m.Password).NotEmpty().Length(8, 20); ;
        }
    }
}
