import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { UserService } from "../../services/user.service";
import { AdminUser } from "../../services/models";

export interface User {
    name: string;
    email: string;
    age: number;
    city: string;
}

@Component({
  selector: "app-user-list",
  templateUrl: "./user.list.component.html",
  styleUrls: ["./user.list.component.css"]
})
export class UserListComponent implements OnInit {
    public users: AdminUser[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.userService.getAdminUsers().subscribe((data) => {
            this.users = data;
        });
    }

    public addUser(): void {
        this.router.navigate(["/users"])
            .then(() => this.router.navigate(["/users/add"], { replaceUrl: true }));
    }
}
