import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
        private childHttp: HttpClient,
        private childCookieService: CookieService
    ) {
        super(childHttp, childCookieService);
        this.apiUrl = "/api/admin/books";
    }

    public searchBooks(params: GetBookParams): Observable<ListResponse<BookModel>> {

        const url = `${this.apiUrl}/search/?${this.joinUrlParams(params)}`;
        const headers = new HttpHeaders({
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        });

        return this.childHttp.get(url, { headers: headers})
            .map((res: Response) => res)
            .catch((error: Response) => this.handleError(error));
    }

    public removeImage(imageId: string, fileName: string): Observable<Response> {
        const headers = new HttpHeaders({
            "X-XSRF-TOKEN": this.csrfToken,
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        });

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
