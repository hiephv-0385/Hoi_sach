import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { CookieService } from "angular2-cookie/core";
import { ListResponse, GetBookParams, BookAvatar, BookModel } from "./models";
import { BaseService } from "./base.service";

@Injectable()
export class BookService extends BaseService {

    constructor(
        private childHttp: Http,
        private childCookieService: CookieService
    ) {
        super(childHttp, childCookieService);
        this.apiUrl = "/api/admin/books";
    }

    public searchBooks(params: GetBookParams): Observable<ListResponse<BookModel>> {

        const url = `${this.apiUrl}/search/?${this.joinUrlParams(params)}`;
        return this.childHttp.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => this.handleError(error));
    }

    public removeImage(imageId: string, fileName: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        headers.set("Authorization", `Bearer ${localStorage.getItem("jwtToken")}`);

        const url = `${this.apiUrl}/images/remove`;
        const payload: BookAvatar = {
            imageId: imageId,
            fileName: fileName
        };

        return this.childHttp.post(url, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => this.handleError(error));
    }
}
