import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./mainSidebar.component.html",
    styleUrls: ["./mainSidebar.component.css"]
})
export class MainSidebarComponent {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    public logout(): void {
        this.authService.logout().subscribe(result => {
            this.router.navigate(["/cpanel/login"]);
        });
    }
}
