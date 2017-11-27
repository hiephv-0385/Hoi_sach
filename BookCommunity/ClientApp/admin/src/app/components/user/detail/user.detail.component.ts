import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Md5 } from "ts-md5/dist/md5";

import { UserService } from "../../../services/user.service";
import { UploadService } from "../../../services/upload.service";
import { AdminUser, UpdateAdminUserModel, ResponseNotify, ErrorInfo } from "../../../services/models";
import { PasswordValidation } from "../../../shared/password.validation";

@Component({
    selector: "app-user-detail",
    templateUrl: "./user.detail.component.html",
    styleUrls: ["./user.detail.component.css"]
})
export class UserDetailComponent implements OnInit {
    public userform: FormGroup;
    public responseNotify: ResponseNotify;

    firstName: FormControl;
    lastName: FormControl;
    email: FormControl;
    avatar: FormControl;
    password: FormControl;
    confirmPassword: FormControl;
    isActive: FormControl;

    private uploadedFileName: string;
    private userId: string;

    constructor(
        private userService: UserService,
        private uploadService: UploadService,
        protected fb: FormBuilder,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.createUserFormControls();
        this.createForm();
        this.route.params.subscribe(params => {
            if (!params["id"]) {
                return;
            }

            this.userId = params["id"];
            this.userService.get<AdminUser>(this.userId).subscribe((data) => {
                this.fillAdminUser(data);
            });
         });
    }

    public saveUser(): void {
        if (this.userform.invalid) {
            return;
        }

        this.saveOrUpdate();
    }

    public onFileChange(event: any): void {
        const apiUrl = "/api/admin/users/avatars";
        this.uploadService.uploadFile(event, apiUrl).subscribe((result) => {
            this.uploadedFileName = result.fileName;
        });
    }

    public removeAvatar(): void {
        const apiUrl = "/api/admin/users/avatars/remove";
        this.uploadService.removeFile(this.uploadedFileName, apiUrl).subscribe(data => {
        },
        (err: ErrorInfo) => {
            this.responseNotify = {
                isSuccess: false,
                message: `Remove avatar error: ${err.message}`
            };
        });
        this.uploadedFileName = "";
    }

    private saveOrUpdate(): void {
        if (this.userId) {
            this.updateAdminUser();
        } else {
            this.addUser();
        }
    }

    private addUser(): void {
        console.log("md5", Md5.hashStr(this.password.value).toString());
        const user: AdminUser = {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            email: this.email.value,
            password: Md5.hashStr(this.password.value).toString(),
            avatar: this.uploadedFileName,
            isActive: this.isActive.value || false,
            isSupperUser: false
        };

        this.userService.add(user).subscribe((data) => {
            this.responseNotify = {
                isSuccess: true,
                message: "User has been updated successfuly"
            };
        },
        (err: ErrorInfo) => {
            this.responseNotify = {
                isSuccess: false,
                message: err.message
            };
        });
    }

    private updateAdminUser(): void {
        const payload: UpdateAdminUserModel = {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            avatar: this.uploadedFileName,
            isActive: this.isActive.value || false
        };

        this.userService.update(this.userId, payload).subscribe((data) => {
            this.responseNotify = {
                isSuccess: true,
                message: "User has been updated successfuly"
            };
        },
        (err: ErrorInfo) => {
            this.responseNotify = {
                isSuccess: false,
                message: err.message
            };
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

    private fillAdminUser(user: AdminUser) {
        if (!user) {
            return;
        }

        this.firstName.setValue(user.firstName);
        this.lastName.setValue(user.lastName);
        this.email.setValue(user.email);
        this.email.disable();
        this.password.setValue(user.password);
        this.password.disable();
        this.confirmPassword.setValue(user.password);
        this.confirmPassword.disable();
        this.uploadedFileName = user.avatar;
        this.isActive.setValue(user.isActive);
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

    public clearForm() {
        this.uploadedFileName = "";
        this.userform.reset();
    }
}
