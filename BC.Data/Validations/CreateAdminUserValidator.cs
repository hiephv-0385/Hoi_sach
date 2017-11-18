using BC.Data.Models;
using FluentValidation;

namespace BC.Data.Validations
{
    public class CreateAdminUserValidator: AbstractValidator<AdminUserModel>
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
