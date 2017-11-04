import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { UserService } from "../../services/user.service";
import { AdminUser, ExtendedAdminUser, ResponseNotify } from "../../services/models";

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
    public users: ExtendedAdminUser[] = [];
    public responseNotify: ResponseNotify;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.userService.getAdminUsers().subscribe((data) => {
            this.users = data.map(item => <ExtendedAdminUser>item);
        });
    }

    public addUser(): void {
        this.router.navigate(["/users"])
            .then(() => this.router.navigate(["/users/add"], { replaceUrl: true }));
    }

    public deleteUser(): void {
        const deletedUserIds = this.users.filter(u => u.isChecked).map(u => u.id);
        this.userService.deleteAdminUsers(deletedUserIds).subscribe((data) => {
            this.users = this.users.filter(u => !deletedUserIds.includes(u.id, 0));
            this.responseNotify = {
                isSuccess: true,
                message: "User(s) have delete successfuly"
            };
        },
        (err) => {
            this.responseNotify = {
                isSuccess: false,
                message: `Error happen: ${err.toString()}`
            };
        });
    }
}
