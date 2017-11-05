import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { UserService } from "../../../services/user.service";
import {
    AdminUser,
    ExtendedAdminUser,
    ResponseNotify,
    GetAdminUsersParams,
    AdminUserListResponse
} from "../../../services/models";

@Component({
  selector: "app-user-list",
  templateUrl: "./user.list.component.html",
  styleUrls: ["./user.list.component.css"]
})
export class UserListComponent implements OnInit {
    public adminUserList: AdminUserListResponse;
    public responseNotify: ResponseNotify;
    public page = 1;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {
     }

    ngOnInit() {
        const params: GetAdminUsersParams = {
            offset: 0,
            limit: 5
        };
        this.userService.getAdminUsers(params).subscribe((result) => {
            if (!result.data) {
                return;
            }

            const extUsers = result.data.map(item => <ExtendedAdminUser>item);
            this.adminUserList = {
                count: result.count,
                data: extUsers
            };
        });
    }

    public addUser(): void {
        this.router.navigate(["/users"])
            .then(() => this.router.navigate(["/users/add"], { replaceUrl: true }));
    }

    public deleteUser(): void {
        const deletedUserIds = this.adminUserList.data.filter(u => u.isChecked).map(u => u.id);
        this.userService.deleteAdminUsers(deletedUserIds).subscribe((data) => {
            this.adminUserList.data = this.adminUserList.data.filter(u => !deletedUserIds.includes(u.id, 0));
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

        this.userService.getAdminUsers(params).subscribe((data) => {
            this.adminUserList = data;
        });
    }
}
