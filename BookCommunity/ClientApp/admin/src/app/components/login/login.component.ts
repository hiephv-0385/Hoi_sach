import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Md5 } from "ts-md5/dist/md5";

import { AuthService } from "../../services/auth.service";
import { UserCredential, ResponseNotify, ErrorInfo } from "../../services/models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    public isLogged = false;
    public responseNotify: ResponseNotify;

    public loginForm: FormGroup;

    public email: FormControl;
    public password: FormControl;
    public isRememberMe: FormControl;

    constructor(
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService) {
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

    public login(): void {
        const credential: UserCredential = {
            email: this.email.value,
            password: Md5.hashStr(this.password.value).toString(),
            isRememberMe: this.isRememberMe.value
        }
        this.authService.login(credential).subscribe(result => {
            this.isLogged = true;
            this.router.navigate(["/"]);
        },
        (err: ErrorInfo) => {
            this.responseNotify = {
                isSuccess: false,
                message: err.message
            };
        });
    }

    private createFormControls() {
        this.email = new FormControl("", [Validators.required, Validators.email]);
        this.password = new FormControl("", Validators.required);
        this.isRememberMe = new FormControl(false);
    }

    private createForm() {
        this.loginForm = this.fb.group({
            email: this.email,
            password: this.password,
            isRememberMe: this.isRememberMe
        });
    }
}
