import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/observable/throw";

import { CookieService } from "angular2-cookie/core";
import { ListResponse, GetPublisherParams, Avatar, Publisher } from "./models";

@Injectable()
export class PublisherService {
    private publisherUrl = "/api/publishers";
    private csrfToken: string;

    constructor(
        private http: Http,
        private cookieService: CookieService
    ) {
        this.csrfToken = this.cookieService.get("XSRF-TOKEN");
    }

    public getPublisher(publisherId: string): Observable<Publisher> {
        const url = `${this.publisherUrl}/${publisherId}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public getPublishers(params: GetPublisherParams): Observable<ListResponse<Publisher>> {
        const url = `${this.publisherUrl}?offset=${params.offset}&limit=${params.limit}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public addPublisher(publisher: Publisher): Observable<Publisher> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);

        return this.http.post(this.publisherUrl, publisher, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public updatePublisher(publisherId: string, payload: Publisher): Observable<Publisher> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const url = `${this.publisherUrl}/${publisherId}`;

        return this.http.put(url, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public deletePublisher(publisherId: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const deleteUrl = `${this.publisherUrl}/${publisherId}`;

        return this.http.delete(deleteUrl, { headers: headers })
            .map((res: Response) => res);
    }

    public deletePublishers(publisherIds: string[]): Observable<void> {
        const requests = publisherIds.map(a => this.deletePublisher(a));
        return Observable.combineLatest(requests)
        .catch((error: Response) => Observable.throw(error || "Server error"));
    }

    public removeLogo(fileName: string): Observable<Response> {
        const headers = new Headers();
        headers.set("X-XSRF-TOKEN", this.csrfToken);
        const url = `${this.publisherUrl}/logos/remove`;
        const payload: Avatar = {
            fileName: fileName
        };

        return this.http.post(url, payload, { headers: headers })
            .map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || "Server error"));
    }
}



