import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/observable/throw";

import { CookieService } from "angular2-cookie/core";
import { Author, ListResponse, GetAuthorsParams, Avatar } from "./models";
import { BaseService } from "./base.service";

@Injectable()
export class AuthorService extends BaseService {
    private authorUrl = "/api/authors";
    private csrfToken: string;

    constructor(
        private http: Http,
        private cookieService: CookieService
    ) {
        super();
        this.csrfToken = this.cookieService.get("XSRF-TOKEN");
    }

    public getAuthor(authorId: string): Observable<Author> {
        const url = `${this.authorUrl}/${authorId}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public getAuthors(params: GetAuthorsParams): Observable<ListResponse<Author>> {
        const url = `${this.authorUrl}?${this.joinUrlParams(params)}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public addAuthor(author: Author): Observable<Author> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);

        return this.http.post(this.authorUrl, author, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public updateAuthor(authorId, payload: Author): Observable<Author> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const url = `${this.authorUrl}/${authorId}`;

        return this.http.put(url, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public deleteAuthor(authorId: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const deleteUrl = `${this.authorUrl}/${authorId}`;

        return this.http.delete(deleteUrl, { headers: headers })
            .map((res: Response) => res);
    }

    public deleteAuthors(countryIds: string[]): Observable<void> {
        const requests = countryIds.map(a => this.deleteAuthor(a));
        return Observable.combineLatest(requests)
            .catch((error: any) => {
                console.log("error", error);
                return Observable.throw(JSON.stringify(error) || "Server error");
            });
    }

    public removePicture(fileName: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const url = `${this.authorUrl}/pictures/remove`;
        const payload: Avatar = {
            fileName: fileName
        };

        return this.http.post(url, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }
}



