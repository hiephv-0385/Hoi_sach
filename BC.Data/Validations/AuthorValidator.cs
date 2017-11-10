using BC.Data.Models;
using FluentValidation;
using System;

namespace BC.Data.Validations
{
    public class AuthorValidator: AbstractValidator<Author>
    {
        public AuthorValidator()
        {
            RuleFor(m => m.FullName).NotEmpty();

            RuleFor(m => m.Birthday)
                .NotEmpty()
                .Must(a => BeValidDate(a.ToString()))
                .WithMessage("Invalid date/time");

            RuleFor(m => m.Introduction).NotEmpty();

            RuleFor(m => m.Country).NotNull();
        }

        private bool BeValidDate(string value)
        {
            DateTime date;
            return DateTime.TryParse(value, out date);
        }
    }
}
