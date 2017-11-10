import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/combineLatest";

import { CookieService } from "angular2-cookie/core";
import {
    AdminUser,
    GetAdminUsersParams,
    ListResponse,
    Avatar,
    UpdateAdminUserDto
} from "./models";

@Injectable()
export class UserService {
    private adminUserUrl = "/api/adminusers";
    private csrfToken: string;

    constructor(
        private http: Http,
        private cookieService: CookieService
    ) {
        this.csrfToken = this.cookieService.get("XSRF-TOKEN");
    }

    public getAdminUser(userId: string): Observable<AdminUser> {
        const url = `${this.adminUserUrl}/${userId}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || "Server error"));
    }

    public getAdminUsers(params: GetAdminUsersParams): Observable<ListResponse<AdminUser>> {
        const url = `${this.adminUserUrl}?offset=${params.offset}&limit=${params.limit}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || "Server error"));
    }

    public addAdminUser(user: AdminUser): Observable<AdminUser> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);

        return this.http.post(this.adminUserUrl, user, { headers: headers })
            .map((res: Response) => res)
            .catch((error: any) => {
                console.log("error", error);
                return Observable.throw(JSON.stringify(error) || "Server error");
            });
    }

    public updateAdminUser(userId, payload: UpdateAdminUserDto): Observable<UpdateAdminUserDto> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const url = `${this.adminUserUrl}/${userId}`;

        return this.http.put(url, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: any) => {
                console.log("error", error);
                return Observable.throw(JSON.stringify(error) || "Server error");
            });
    }

    public deleteAdminUser(userId: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const deleteUrl = `${this.adminUserUrl}/${userId}`;

        return this.http.delete(deleteUrl, { headers: headers })
            .map((res: Response) => res);
    }

    public deleteAdminUsers(userIds: string[]): Observable<void> {
        const requests = userIds.map(u => this.deleteAdminUser(u));
        return Observable.combineLatest(requests)
            .catch((error: any) => {
                console.log("error", error);
                return Observable.throw(JSON.stringify(error) || "Server error");
            });
    }

    public removeAvatar(fileName: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const url = `${this.adminUserUrl}/avatar/remove`;
        const payload: Avatar = {
            fileName: fileName
        };

        return this.http.post(url, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: any) => {
                console.log("error", error);
                return Observable.throw(JSON.stringify(error) || "Server error");
            });
    }
}



