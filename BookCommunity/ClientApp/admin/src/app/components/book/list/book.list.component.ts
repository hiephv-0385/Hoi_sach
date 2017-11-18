import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { BookService } from "../../../services/book.service";
import { BookCategoryService } from "../../../services/bookCategory.service";
import {
    BookModel,
    ResponseNotify,
    GetBookParams,
    ListResponse,
    BookCategory
} from "../../../services/models";

@Component({
  selector: "app-book-list",
  templateUrl: "./book.list.component.html",
  styleUrls: ["./book.list.component.css"]
})
export class BookListComponent implements OnInit {
    public bookList: ListResponse<BookModel>;
    public categories: BookCategory[];
    public responseNotify: ResponseNotify;
    public searchParams: GetBookParams;
    public page = 1;

    constructor(
        private router: Router,
        private bookService: BookService,
        private bookCategoryService: BookCategoryService
    ) {
        this.searchParams = {
            offset: 0,
            limit: 10,
            categoryId: ""
        };
     }

    ngOnInit() {
        this.bookCategoryService.searchBookCategories({ offset: 0 }).subscribe(result => {
            this.categories = result;
        });

        this.bookService.searchBooks(this.searchParams).subscribe((result) => {
            if (!result.items) {
                return;
            }

            const extBooks = result.items.map(item => <BookModel>item);
            this.bookList = {
                count: result.count,
                items: extBooks
            };
        });
    }

    public addBook(): void {
        this.router.navigate(["/books"])
            .then(() => this.router.navigate(["/books/add"], { replaceUrl: true }));
    }

    public deleteBooks(): void {
        const deletedBookIds = this.bookList.items
            .filter(c => c.isChecked)
            .map(c => c.id);
        this.bookService.deleteMany(deletedBookIds)
            .subscribe((data) => {
                this.bookList.items = this.bookList.items.filter(u => !deletedBookIds.includes(u.id, 0));
                this.bookList.count = this.bookList.count - deletedBookIds.length;
                this.responseNotify = {
                    isSuccess: true,
                    message: "Book(s) have delete successfuly"
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
        this.searchParams.offset = (this.page - 1) * limit;
        this.searchParams.limit = limit;

        this.bookService.searchBooks(this.searchParams).subscribe((result) => {
            this.bookList = result;
        });
    }

    public searchBook(): void {
        this.bookService.searchBooks(this.searchParams).subscribe((result) => {
            this.bookList = result;
        });
    }
}
