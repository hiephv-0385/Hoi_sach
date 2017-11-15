import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { BookCategoryService } from "../../../services/bookCategory.service";
import {
    BookCategory,
    ResponseNotify,
    GetBookCategoryParams,
    ListResponse,
    GetBookParams
} from "../../../services/models";

@Component({
    selector: "app-book-category-list",
    templateUrl: "./bookCategory.list.component.html",
    styleUrls: ["./bookCategory.list.component.css"]
})
export class BookCategoryListComponent implements OnInit {
    public categoryList: ListResponse<BookCategory>;
    public responseNotify: ResponseNotify;
    public searchParams: GetBookParams;
    public page = 1;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private bookCategoryService: BookCategoryService
    ) {
     }

    ngOnInit() {
        this.searchParams = {
            offset: 0,
            limit: 10
        };
        this.bookCategoryService.getBookCategories(this.searchParams).subscribe((result) => {
            if (!result.data) {
                return;
            }

            const extCategories = result.data.map(item => <BookCategory>item);
            this.categoryList = {
                count: result.count,
                data: extCategories
            };
        });
    }

    public addBookCategory(): void {
        this.router.navigate(["/bookcategories"])
            .then(() => this.router.navigate(["/bookcategories/add"], { replaceUrl: true }));
    }

    public deleteBookCategories(): void {
        const deletedCategoryIds = this.categoryList.data
            .filter(c => c.isChecked)
            .map(c => c.id);
        this.bookCategoryService.deleteBookCategories(deletedCategoryIds)
            .subscribe((data) => {
                this.categoryList.data = this.categoryList.data.filter(u => !deletedCategoryIds.includes(u.id, 0));
                this.categoryList.count = this.categoryList.count - deletedCategoryIds.length;
                this.responseNotify = {
                    isSuccess: true,
                    message: "Book categories have delete successfuly"
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
        this.searchParams = {
            offset: (this.page - 1) * limit,
            limit: limit
        };

        this.bookCategoryService.getBookCategories(this.searchParams).subscribe((result) => {
            this.categoryList = result;
        });
    }
}
