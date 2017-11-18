import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { CookieService } from "angular2-cookie/core";
import { BaseService } from "./base.service";

@Injectable()
export class ReleaseCompanyService extends BaseService {
    private releaseCompanyUrl = "/api/releasecompanies";

    constructor(
        private childHttp: Http,
        private childCookieService: CookieService
    ) {
        super(childHttp, childCookieService);
        this.apiUrl = "/api/releasecompanies";
    }
}



