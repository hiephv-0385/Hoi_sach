import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";

import { CookieService } from "angular2-cookie/core";
import { Avatar, UploadResult } from "./models";

@Injectable()
export class UploadService {
    private csrfToken: string;

    constructor(
        private http: Http,
        private cookieService: CookieService
    ) {
        this.csrfToken = this.cookieService.get("XSRF-TOKEN");
    }

    public uploadFile(event: any, apiUrl: string): Observable<UploadResult> {
        const fi = event.srcElement;
        if (!fi.files || !fi.files[0]) {
            return;
        }

        const fileToUpload = fi.files[0];
        const formData: FormData = new FormData();
        formData.append(fileToUpload.name, fileToUpload);

        const headers = new Headers();
        headers.set("Accept", "application/json");
        headers.set("X-XSRF-TOKEN", this.csrfToken);

        return this.http.post(apiUrl, formData, { headers: headers })
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
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

        const headers = new Headers();
        headers.set("Accept", "application/json");
        headers.set("X-XSRF-TOKEN", this.csrfToken);

        return this.http.post(apiUrl, formData, { headers: headers })
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public removeFile(fileName: string, removeApi: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const payload: Avatar = {
            fileName: fileName
        };

        return this.http.post(removeApi, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }
}



