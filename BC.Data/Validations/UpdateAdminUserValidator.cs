using BC.Data.Models;
using FluentValidation;

namespace BC.Data.Validations
{
    public class UpdateAdminUserValidator: AbstractValidator<UpdateAdminUserDto>
    {
        public UpdateAdminUserValidator()
        {
            RuleFor(m => m.FirstName).NotEmpty();

            RuleFor(m => m.LastName).NotEmpty();
        }
    }
}
