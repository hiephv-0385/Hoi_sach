import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "./services/auth.service";
import { ConfimService } from "./services/confirm.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [ConfimService]
})
export class AppComponent {
    public isLogged = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private confirmService: ConfimService
    ) {
        this.authService.getLoginStatus().subscribe(result => {
            this.isLogged = result;
            if (!this.isLogged) {
                this.router.navigate(["/cpanel/login"]);
            }
        });

        this.confirmService.confirmLogin$.subscribe(result => {
            console.log("result", result);
            this.isLogged = result;
            this.router.navigate(["/admin"]);
        });
    }
}
