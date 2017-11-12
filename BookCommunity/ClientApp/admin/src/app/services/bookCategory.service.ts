import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/observable/throw";

import { CookieService } from "angular2-cookie/core";
import { ListResponse, GetBookCategoryParams, Avatar, BookCategory } from "./models";

@Injectable()
export class BookCategoryService {
    private booCategoryUrl = "/api/bookcategories";
    private csrfToken: string;

    constructor(
        private http: Http,
        private cookieService: CookieService
    ) {
        this.csrfToken = this.cookieService.get("XSRF-TOKEN");
    }

    public getBookCategory(categoryId: string): Observable<BookCategory> {
        const url = `${this.booCategoryUrl}/${categoryId}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public getBookCategories(params: GetBookCategoryParams): Observable<ListResponse<BookCategory>> {
        const url = `${this.booCategoryUrl}?offset=${params.offset}&limit=${params.limit}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public addBookCategory(category: BookCategory): Observable<BookCategory> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);

        return this.http.post(this.booCategoryUrl, category, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public updateBooCategory(categoryId: string, payload: BookCategory): Observable<BookCategory> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const url = `${this.booCategoryUrl}/${categoryId}`;

        return this.http.put(url, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public deleteBookCategory(categoryId: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const deleteUrl = `${this.booCategoryUrl}/${categoryId}`;

        return this.http.delete(deleteUrl, { headers: headers })
            .map((res: Response) => res);
    }

    public deleteBookCategories(categoryIds: string[]): Observable<void> {
        const requests = categoryIds.map(c => this.deleteBookCategory(c));
        return Observable.combineLatest(requests)
        .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public removeLogo(fileName: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const url = `${this.booCategoryUrl}/pictures/remove`;
        const payload: Avatar = {
            fileName: fileName
        };

        return this.http.post(url, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }
}
