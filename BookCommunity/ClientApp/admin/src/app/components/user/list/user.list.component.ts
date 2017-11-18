import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../../../services/user.service";
import {
    AdminUser,
    ResponseNotify,
    GetAdminUsersParams,
    ListResponse
} from "../../../services/models";

@Component({
  selector: "app-user-list",
  templateUrl: "./user.list.component.html",
  styleUrls: ["./user.list.component.css"]
})
export class UserListComponent implements OnInit {
    public adminUserList: ListResponse<AdminUser>;
    public responseNotify: ResponseNotify;
    public page = 1;

    constructor(
        private router: Router,
        private userService: UserService
    ) {
     }

    ngOnInit() {
        const params: GetAdminUsersParams = {
            offset: 0,
            limit: 5
        };
        this.userService.getList<AdminUser>(params).subscribe((result) => {
            if (!result.items) {
                return;
            }

            const extUsers = result.items.map(item => <AdminUser>item);
            this.adminUserList = {
                count: result.count,
                items: extUsers
            };
        });
    }

    public addUser(): void {
        this.router.navigate(["/users"])
            .then(() => this.router.navigate(["/users/add"], { replaceUrl: true }));
    }

    public deleteUser(): void {
        const deletedUserIds = this.adminUserList.items.filter(u => u.isChecked).map(u => u.id);
        this.userService.deleteMany(deletedUserIds).subscribe((data) => {
            this.adminUserList.items = this.adminUserList.items.filter(u => !deletedUserIds.includes(u.id, 0));
            this.adminUserList.count = this.adminUserList.count - deletedUserIds.length;
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

    public pageChanged($event): void {
        const limit = 5;
        this.page = +$event;
        const params: GetAdminUsersParams = {
            offset: (this.page - 1) * limit,
            limit: limit
        };

        this.userService.getList<AdminUser>(params).subscribe((data) => {
            this.adminUserList = data;
        });
    }
}
