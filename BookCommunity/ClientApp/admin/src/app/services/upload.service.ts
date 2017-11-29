import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";

import { CookieService } from "angular2-cookie/core";
import { BaseService } from "./base.service";
import { Avatar, UploadResult } from "./models";

@Injectable()
export class UploadService extends BaseService {

    constructor(
        private childHttp: HttpClient,
        private childCookieService: CookieService
    ) {
        super(childHttp, childCookieService);
    }

    public uploadFile(event: any, apiUrl: string): Observable<UploadResult> {
        const fi = event.srcElement;
        if (!fi.files || !fi.files[0]) {
            return;
        }

        const fileToUpload = fi.files[0];
        const formData: FormData = new FormData();
        formData.append(fileToUpload.name, fileToUpload);

        const headers = new HttpHeaders({
            "Accept": "application/json",
            "X-XSRF-TOKEN": this.csrfToken,
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        });

        return this.childHttp.post(apiUrl, formData, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => this.handleError(error));
    }

    public uploadMultipleFiles(event: any, apiUrl: string): Observable<UploadResult> {
        const fi = event.srcElement;
        if (!fi.files) {
            return;
        }

        const formData: FormData = new FormData();
        for (const file of fi.files) {
            formData.append(file.name, file);
        }

        const headers = new HttpHeaders({
            "Accept": "application/json",
            "X-XSRF-TOKEN": this.csrfToken,
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        });

        return this.childHttp.post(apiUrl, formData, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => this.handleError(error));
    }

    public removeFile(fileName: string, removeApi: string): Observable<Response> {
        const headers = new HttpHeaders({
            "X-XSRF-TOKEN": this.csrfToken,
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        });
        const payload: Avatar = {
            fileName: fileName
        };

        return this.childHttp.post(removeApi, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => this.handleError(error));
    }
}

