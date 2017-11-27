import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { BookCategoryService } from "../../../services/bookCategory.service";
import {
    BookCategory,
    ResponseNotify,
    ListResponse,
    GetBookParams,
    ErrorInfo
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
        private router: Router,
        private bookCategoryService: BookCategoryService
    ) {
     }

    ngOnInit() {
        this.searchParams = {
            offset: 0,
            limit: 10
        };
        this.bookCategoryService.getList<BookCategory>(this.searchParams).subscribe((result) => {
            if (!result.items) {
                return;
            }

            const extCategories = result.items.map(item => <BookCategory>item);
            this.categoryList = {
                count: result.count,
                items: extCategories
            };
        });
    }

    public addBookCategory(): void {
        this.router.navigate(["/admin/bookcategories"])
            .then(() => this.router.navigate(["/admin/bookcategories/add"], { replaceUrl: true }));
    }

    public deleteBookCategories(): void {
        const deletedCategoryIds = this.categoryList.items
            .filter(c => c.isChecked)
            .map(c => c.id);
        this.bookCategoryService.deleteMany(deletedCategoryIds)
            .subscribe((data) => {
                this.categoryList.items = this.categoryList.items.filter(u => !deletedCategoryIds.includes(u.id, 0));
                this.categoryList.count = this.categoryList.count - deletedCategoryIds.length;
                this.responseNotify = {
                    isSuccess: true,
                    message: "Book categories have delete successfuly"
                };
            },
            (err: ErrorInfo) => {
                this.responseNotify = {
                    isSuccess: false,
                    message: err.message
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

        this.bookCategoryService.getList<BookCategory>(this.searchParams).subscribe((result) => {
            this.categoryList = result;
        });
    }
}
