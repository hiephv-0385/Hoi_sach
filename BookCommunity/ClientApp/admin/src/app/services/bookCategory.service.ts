import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
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
        private childHttp: Http,
        private childCookieService: CookieService
    ) {
        super(childHttp, childCookieService);
        this.apiUrl = "/api/bookcategories";
    }

    public searchBookCategories(params: GetBookCategoryParams): Observable<BookCategory[]> {
        const url = `${this.apiUrl}/search?${this.joinUrlParams(params)}`;
        return this.childHttp.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => this.handleError(error));
    }
}
