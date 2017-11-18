using BC.Data.Models;
using FluentValidation;

namespace BC.Data.Validations
{
    public class UpdateAdminUserValidator: AbstractValidator<UpdateAdminUserModel>
    {
        public UpdateAdminUserValidator()
        {
            RuleFor(m => m.FirstName).NotEmpty();

            RuleFor(m => m.LastName).NotEmpty();
        }
    }
}
