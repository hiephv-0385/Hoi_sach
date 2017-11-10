import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthorService } from "../../../services/author.service";
import {
    Author,
    ResponseNotify,
    GetAuthorsParams,
    ListResponse
} from "../../../services/models";

@Component({
  selector: "app-author-list",
  templateUrl: "./author.list.component.html",
  styleUrls: ["./author.list.component.css"]
})
export class AuthorListComponent implements OnInit {
    public authorList: ListResponse<Author>;
    public responseNotify: ResponseNotify;
    public page = 1;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authorService: AuthorService
    ) {
     }

    ngOnInit() {
        const params: GetAuthorsParams = {
            offset: 0,
            limit: 10
        };
        this.authorService.getAuthors(params).subscribe((result) => {
            if (!result.data) {
                return;
            }

            const extAuthors = result.data.map(item => <Author>item);
            this.authorList = {
                count: result.count,
                data: extAuthors
            };
        });
    }

    public addAuthor(): void {
        this.router.navigate(["/authors"])
            .then(() => this.router.navigate(["/authors/add"], { replaceUrl: true }));
    }

    public deleteAuthor(): void {
        const deletedAuthorIds = this.authorList.data.filter(c => c.isChecked).map(c => c.id);
        this.authorService.deleteAuthors(deletedAuthorIds).subscribe((data) => {
            this.authorList.data = this.authorList.data.filter(u => !deletedAuthorIds.includes(u.id, 0));
            this.authorList.count = this.authorList.count - deletedAuthorIds.length;
            this.responseNotify = {
                isSuccess: true,
                message: "Authors have delete successfuly"
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
        const params: GetAuthorsParams = {
            offset: (this.page - 1) * limit,
            limit: limit
        };

        this.authorService.getAuthors(params).subscribe((result) => {
            this.authorList = result;
        });
    }
}
