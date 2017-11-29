import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { CookieService } from "angular2-cookie/core";
import { BaseService } from "./base.service";
import { ListResponse, GetBookCategoryParams, BookCategory } from "./models";

@Injectable()
export class BookCategoryService extends BaseService {

    constructor(
        private childHttp: HttpClient,
        private childCookieService: CookieService
    ) {
        super(childHttp, childCookieService);
        this.apiUrl = "/api/admin/bookcategories";
    }

    public searchBookCategories(params: GetBookCategoryParams): Observable<BookCategory[]> {
        const url = `${this.apiUrl}/search?${this.joinUrlParams(params)}`;
        const headers = new HttpHeaders({
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        });

        return this.childHttp.get(url, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => this.handleError(error));
    }
}
