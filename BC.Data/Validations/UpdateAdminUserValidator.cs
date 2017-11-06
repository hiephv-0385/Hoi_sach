using BC.Web.Models.AdminUserDomain;
using FluentValidation;

namespace BC.Web.Validations
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
