import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
    public isLogged = false;

    constructor(
      private router: Router,

      private authService: AuthService) {
        this.authService.getLoginStatus().subscribe(result => {
            this.isLogged = result;
            if (!this.isLogged) {
                this.router.navigate(["/login"]);
            }
        });
    }
}
