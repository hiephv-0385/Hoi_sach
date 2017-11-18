import { Http, Response, URLSearchParams, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/observable/throw";

import { CookieService } from "angular2-cookie/core";
import { QueryParams, ListResponse, Avatar } from "./models";

export class BaseService {
    public apiUrl: string;
    public csrfToken: string;

    constructor(
        private http: Http,
        private cookieService: CookieService) {
        this.csrfToken = this.cookieService.get("XSRF-TOKEN");
    }

    public get<T>(itemId: string): Observable<T> {
        const url = `${this.apiUrl}/${itemId}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public getList<T>(params: QueryParams): Observable<ListResponse<T>> {
        const url = `${this.apiUrl}?${this.joinUrlParams(params)}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public add<T>(item: T): Observable<T> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);

        return this.http.post(this.apiUrl, item, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public update<T>(itemId: string, payload: T): Observable<T> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const url = `${this.apiUrl}/${itemId}`;

        return this.http.put(url, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public deleteOne(itemId: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const deleteUrl = `${this.apiUrl}/${itemId}`;

        return this.http.delete(deleteUrl, { headers: headers })
            .map((res: Response) => res);
    }

    public deleteMany(itemIds: string[]): Observable<void> {
        const requests = itemIds.map(item => this.deleteOne(item));
        return Observable.combineLatest(requests)
            .catch((error: any) => {
                console.log("error", error);
                return Observable.throw(JSON.stringify(error) || "Server error");
            });
    }

    public joinUrlParams(params: QueryParams): string {
        const queryParams = new URLSearchParams();
        for (const key in params) {
            if (!params.hasOwnProperty(key)) {
                continue;
            }

            let value = params[key];
            if (!value) {
                continue;
            }

            if (typeof value === "number" || typeof value === "boolean") {
                value = value.toString();
            }

            queryParams.append(key, value);
        }

        return queryParams.toString();
    }
}
