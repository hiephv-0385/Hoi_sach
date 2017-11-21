import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { CookieService } from "angular2-cookie/core";
import { BaseService } from "./base.service";
import { UserCredential, ErrorInfo } from "./models";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class AuthService {
    private baseApiUrl = "/api/auth";
    private csrfToken: string;

    constructor(
        private http: Http,
        private cookieService: CookieService
    ) {
        this.csrfToken = this.cookieService.get("");
    }

    public login(credential: UserCredential): Observable<Response> {
        const headers = new Headers();
        const api = `${this.baseApiUrl}/login`;

        return this.http.post(api, credential)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public logout(): Observable<Response> {
        const api = `${this.baseApiUrl}/logout`;

        return this.http.post(api, {})
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public getLoginStatus(): Observable<boolean> {
        const api = `${this.baseApiUrl}/loginstatus`;

        return this.http.get(api)
            .map((res: Response) => res.json())
            .catch((error: Response) => this.handleError(error));
    }

    private handleError(error: Response): ErrorObservable {
        const errorInfo: ErrorInfo = {
            message: error.statusText
        };

        const errorBody = error.json();
        if (errorBody && errorBody.Message) {
            errorInfo.message = errorBody.Message;
        }
        return Observable.throw(errorInfo || "Server error");
    }
}
