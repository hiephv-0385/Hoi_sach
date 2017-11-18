import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { PasswordValidation } from "../shared/password.validation";

export interface UserFormControls {
    firstName: FormControl;
    lastName: FormControl;
    email: FormControl;
    avatar: FormControl;
    password: FormControl;
    confirmPassword: FormControl;
    isActive: FormControl;
}

export interface AdminForm {
    form: FormGroup;
}

export interface UserForm extends AdminForm {
    controls: UserFormControls;
}

@Injectable()
export class FormService {
    constructor(
        protected fb: FormBuilder
    ) { }

    public createUserForm(): FormGroup {
        const controls = this.createUserFormControls();
        const userform = this.fb.group(
            controls,
            { validator: PasswordValidation.MatchPassword }
        );

        return userform;
    }

    private createUserFormControls() {
        const firstName = new FormControl("", Validators.required);
        const lastName = new FormControl("", Validators.required);
        const email = new FormControl("", [
            Validators.required,
            Validators.email
        ]);
        const password = new FormControl("", [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20)
        ]);
        const confirmPassword = new FormControl("");
        const avatar = new FormControl("");
        const isActive = new FormControl(false);

        const controls: UserFormControls = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            avatar: avatar,
            password: password,
            confirmPassword: confirmPassword,
            isActive: isActive
        };

        return controls;
    }
}
