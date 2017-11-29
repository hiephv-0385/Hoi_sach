import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { CookieService } from "angular2-cookie/core";
import { BaseService } from "./base.service";

@Injectable()
export class UserService extends BaseService {

    constructor(
        private childHttp: HttpClient,
        private childCookieService: CookieService
    ) {
        super(childHttp, childCookieService);
        this.apiUrl = "/api/admin/users";
    }
}



