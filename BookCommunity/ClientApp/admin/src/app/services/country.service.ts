import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/observable/throw";

import { CookieService } from "angular2-cookie/core";
import { Country, ListResponse, GetCountriesParams, Avatar } from "./models";

@Injectable()
export class CountryService {
    private countryUrl = "/api/countries";
    private csrfToken: string;

    constructor(
        private http: Http,
        private cookieService: CookieService
    ) {
        this.csrfToken = this.cookieService.get("XSRF-TOKEN");
    }

    public getCountry(countryId: string): Observable<Country> {
        const url = `${this.countryUrl}/${countryId}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public getCountries(params: GetCountriesParams): Observable<ListResponse<Country>> {
        let url = `${this.countryUrl}?offset=${params.offset}`;
        if (params.limit) {
            url = `${url}&limit=${params.limit}`;
        }
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public getAllCountries(): Observable<ListResponse<Country>> {
        const url = `${this.countryUrl}/all`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public addCountry(user: Country): Observable<Country> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);

        return this.http.post(this.countryUrl, user, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public updateCountry(countryId, payload: Country): Observable<Country> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const url = `${this.countryUrl}/${countryId}`;

        return this.http.put(url, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public deleteCountry(countryId: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const deleteUrl = `${this.countryUrl}/${countryId}`;

        return this.http.delete(deleteUrl, { headers: headers })
            .map((res: Response) => res);
    }

    public deleteCountries(countryIds: string[]): Observable<void> {
        const requests = countryIds.map(c => this.deleteCountry(c));
        return Observable.combineLatest(requests)
        .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public removeFlag(fileName: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const url = `${this.countryUrl}/flags/remove`;
        const payload: Avatar = {
            fileName: fileName
        };

        return this.http.post(url, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }
}



