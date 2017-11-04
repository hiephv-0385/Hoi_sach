import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

import { UserService } from "../../services/user.service";
import { UploadService } from "../../services/upload.service";
import { AdminUser } from "../../services/models";
import { PasswordValidation } from "../../shared/password.validation";

@Component({
    selector: "app-user-detail",
    templateUrl: "./user.detail.component.html",
    styleUrls: ["./user.detail.component.css"]
})
export class UserDetailComponent implements OnInit {
    public userform: FormGroup;

    firstName: FormControl;
    lastName: FormControl;
    email: FormControl;
    avatar: FormControl;
    password: FormControl;
    confirmPassword: FormControl;
    isActive: FormControl;

    private uploadedFileName: string;

    constructor(
        private userService: UserService,
        private uploadService: UploadService,
        protected fb: FormBuilder
    ) { }

    ngOnInit() {
        this.createUserFormControls();
        this.createForm();
    }

    public saveUser(): void {
        if (this.userform.invalid) {
            return;
        }
        const user: AdminUser = {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            email: this.email.value,
            password: this.password.value,
            avatar: this.uploadedFileName,
            isActive: this.isActive.value,
            isSupperUser: false
        };

        this.userService.addAdminUser(user).subscribe((data) => {
        });
    }

    public onFileChange(event: any): void {
        this.uploadService.uploadUserAvatar(event).subscribe((result) => {
            console.log("ok");
            console.log("result", result.fileName);
            this.uploadedFileName = result.fileName;
        });
    }

    private createUserFormControls() {
        this.firstName = new FormControl("", Validators.required);
        this.lastName = new FormControl("", Validators.required);
        this.email = new FormControl("", [
            Validators.required,
            Validators.email
        ]);
        this.password = new FormControl("", [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20)
        ]);
        this.confirmPassword = new FormControl("");
        this.avatar = new FormControl("");
        this.isActive = new FormControl(false);
    }

    private createForm() {
        this.userform = this.fb.group({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
            avatar: this.avatar,
            isActive: this.isActive
        }, { validator: PasswordValidation.MatchPassword });
    }

}
