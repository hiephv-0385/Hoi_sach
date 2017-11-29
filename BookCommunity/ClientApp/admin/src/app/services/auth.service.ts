import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { CookieService } from "angular2-cookie/core";
import { BaseService } from "./base.service";
import { UserCredential, ErrorInfo } from "./models";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

export interface Token {
    jwtToken: string;
}

@Injectable()
export class AuthService {
    private baseApiUrl = "/api/admin/auth";
    private csrfToken: string;

    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ) {
        this.csrfToken = this.cookieService.get("");
    }

    public login(credential: UserCredential): Observable<Token> {
        const headers = new HttpHeaders();
        const api = `${this.baseApiUrl}/login`;

        return this.http.post(api, credential)
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public logout(): Observable<Response> {
        const api = `${this.baseApiUrl}/logout`;

        return this.http.post(api, {})
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public getLoginStatus(): Observable<boolean> {
        const api = `${this.baseApiUrl}/loginstatus`;

        return this.http.get(api)
            .map((res: Response) => res)
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
