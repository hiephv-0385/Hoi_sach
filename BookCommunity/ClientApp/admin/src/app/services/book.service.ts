import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/observable/throw";

import { CookieService } from "angular2-cookie/core";
import { BookListResponse, GetBookParams, BookAvatar, Book, BookModel, StoredBookModel } from "./models";
import { BaseService } from "./base.service";

@Injectable()
export class BookService extends BaseService {
    private bookUrl = "/api/books";
    private bookImageUrl = "/api/bookimages";
    private csrfToken: string;

    constructor(
        private http: Http,
        private cookieService: CookieService
    ) {
        super();
        this.csrfToken = this.cookieService.get("XSRF-TOKEN");
    }

    public getBook(bookId: string): Observable<StoredBookModel> {
        const url = `${this.bookUrl}/${bookId}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public getBooks(params: GetBookParams): Observable<BookListResponse> {
        const url = `${this.bookUrl}/?${this.joinUrlParams(params)}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public searchBooks(params: GetBookParams): Observable<BookListResponse> {

        const url = `${this.bookUrl}/search/?${this.joinUrlParams(params)}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public addBook(category: StoredBookModel): Observable<StoredBookModel> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);

        return this.http.post(this.bookUrl, category, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public updateBook(bookId: string, payload: StoredBookModel): Observable<StoredBookModel> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const url = `${this.bookUrl}/${bookId}`;

        return this.http.put(url, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public deleteBook(bookId: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const deleteUrl = `${this.bookUrl}/${bookId}`;

        return this.http.delete(deleteUrl, { headers: headers })
            .map((res: Response) => res);
    }

    public deleteBooks(bookIds: string[]): Observable<void> {
        const requests = bookIds.map(b => this.deleteBook(b));
        return Observable.combineLatest(requests)
        .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public removeImage(imageId: string, fileName: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const url = `${this.bookUrl}/images/remove`;
        const payload: BookAvatar = {
            imageId: imageId,
            fileName: fileName
        };

        return this.http.post(url, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }
}
