import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { PublisherService } from "../../../services/publisher.service";
import {
    Publisher,
    ResponseNotify,
    GetPublisherParams,
    ListResponse
} from "../../../services/models";

@Component({
  selector: "app-publisher-list",
  templateUrl: "./publisher.list.component.html",
  styleUrls: ["./publisher.list.component.css"]
})
export class PublisherListComponent implements OnInit {
    public publisherList: ListResponse<Publisher>;
    public responseNotify: ResponseNotify;
    public page = 1;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private publisherService: PublisherService
    ) {
     }

    ngOnInit() {
        const params: GetPublisherParams = {
            offset: 0,
            limit: 10
        };
        this.publisherService.getPublishers(params).subscribe((result) => {
            if (!result.data) {
                return;
            }

            const extPublishers = result.data.map(item => <Publisher>item);
            this.publisherList = {
                count: result.count,
                data: extPublishers
            };
        });
    }

    public addPublisher(): void {
        this.router.navigate(["/publishers"])
            .then(() => this.router.navigate(["/publishers/add"], { replaceUrl: true }));
    }

    public deletePublishers(): void {
        const deletedPublisherIds = this.publisherList.data
            .filter(c => c.isChecked)
            .map(c => c.id);
        this.publisherService.deletePublishers(deletedPublisherIds)
            .subscribe((data) => {
                this.publisherList.data = this.publisherList.data.filter(u => !deletedPublisherIds.includes(u.id, 0));
                this.publisherList.count = this.publisherList.count - deletedPublisherIds.length;
                this.responseNotify = {
                    isSuccess: true,
                    message: "Publisher have delete successfuly"
                };
            },
            (err) => {
                this.responseNotify = {
                    isSuccess: false,
                    message: err.statusText
                };
            });
    }

    public pageChanged($event): void {
        const limit = 10;
        this.page = +$event;
        const params: GetPublisherParams = {
            offset: (this.page - 1) * limit,
            limit: limit
        };

        this.publisherService.getPublishers(params).subscribe((result) => {
            this.publisherList = result;
        });
    }
}
