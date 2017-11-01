import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";

import * as adminModel from "./models";

@Injectable()
export class UserService {
    private adminUserUrl = "/api/adminusers/";

    constructor(private http: Http) {
    }

    public getAdminUsers(): Observable<adminModel.AdminUser[]> {
        return this.http.get(this.adminUserUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || "Server error"));
    }

    public addAdminUser(user: adminModel.AdminUser): Observable<adminModel.AdminUser> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", "");

        return this.http.post(this.adminUserUrl, user, { headers: headers })
            .map((res: Response) => res)
            .catch((error: any) => {
                console.log("error", error);
                return Observable.throw(JSON.stringify(error) || "Server error");
            });
    }
}



