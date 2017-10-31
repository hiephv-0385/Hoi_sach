import {AbstractControl} from '@angular/forms';

export class PasswordValidation {

    static MatchPassword(constrol: AbstractControl) {
        const password = constrol.get('password').value; // to get value in input tag
        const confirmPassword = constrol.get('confirmPassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            constrol.get('confirmPassword').setErrors({ MatchPassword: true });
        }

        return null;
    }
}
