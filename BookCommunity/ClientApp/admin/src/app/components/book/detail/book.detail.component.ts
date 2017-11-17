import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/combineLatest";

import { BookCategoryService } from "../../../services/bookCategory.service";
import { AuthorService } from "../../../services/author.service";
import { ReleaseCompanyService } from "../../../services/releaseCompany.service";
import { PublisherService } from "../../../services/publisher.service";
import { UploadService } from "../../../services/upload.service";
import {
    BookCategory,
    ResponseNotify,
    ListResponse,
    StoredBookModel,
    Author,
    ReleaseCompany,
    Publisher,
    BookImage,
    UploadedFile
} from "../../../services/models";
import { BookService } from "../../../services/book.service";

@Component({
    selector: "app-book-detail",
    templateUrl: "./book.detail.component.html",
    styleUrls: ["./book.detail.component.css"]
})
export class BookDetailComponent implements OnInit {
    public bookForm: FormGroup;
    public responseNotify: ResponseNotify;
    public bookId: string;
    public book: StoredBookModel;
    public categories: BookCategory[];
    public authors: Author[];
    public releaseCompanies: ReleaseCompany[];
    public publishers: Publisher[];
    public bookImages: BookImage[];

    private uploadedFiles: UploadedFile[];

    name: FormControl;
    pageCount: FormControl;
    publishedYear: FormControl;
    summary: FormControl;
    buyAddress: FormControl;
    categoryId: FormControl;
    authorId: FormControl;
    publisherId: FormControl;
    releaseCompanyId: FormControl;
    isActive: FormControl;

    constructor(
        private bookCategoryService: BookCategoryService,
        private authorService: AuthorService,
        private releaseCompanyService: ReleaseCompanyService,
        private publisherService: PublisherService,
        private bookService: BookService,
        private uploadService: UploadService,
        protected fb: FormBuilder,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.createFormControls();
        this.createForm();

        Observable.combineLatest(
            this.bookCategoryService.searchBookCategories({ offset: 0 }),
            this.authorService.getAuthors({ offset: 0 }),
            this.releaseCompanyService.getReleaseCompanies({offset: 0 }),
            this.publisherService.getPublishers({ offset: 0 })
        ).subscribe(result => {
            this.categories = result[0];
            if (result[1]) {
                this.authors = result[1].data;
            }
            if (result[2]) {
                this.releaseCompanies = result[2].data;
            }
            if (result[3]) {
                this.publishers = result[3].data;
            }
        });

        this.route.params.subscribe(params => {
            if (!params["id"]) {
                return;
            }

            this.bookId = params["id"];
            this.bookService.getBook(this.bookId).subscribe(data => {
                this.book = data;
                this.fillBook(data);
            });
        });
    }

    public saveBook(): void {
        if (this.bookForm.invalid) {
            return;
        }

        this.saveOrUpdate();
    }

    public onFileChange(event: any): void {
        const apiUrl = "/api/books/images";
        this.uploadService.uploadMultipleFiles(event, apiUrl).subscribe((result) => {
            this.uploadedFiles = result.uploadedFiles;
        });
    }

    public removeImage(img: UploadedFile): void {
        this.bookService.removeImage(img.id || undefined, img.fileName).subscribe(data => {
        },
        (err: Response) => {
            this.responseNotify = {
                isSuccess: false,
                message: err.statusText
            };
        });
        const index = this.uploadedFiles.indexOf(img);
        this.uploadedFiles.splice(index, 1);
        // if (imageId) {
        //     this.uploadedFiles = this.uploadedFiles.filter(f => f.id === imageId);
        // } else if (fileName) {
        //     this.uploadedFiles = this.uploadedFiles.filter(f => f.fileName === fileName);
        // }
    }

    private saveOrUpdate(): void {
        if (this.bookId) {
            this.updateBook();
        } else {
            this.addBook();
        }
    }

    private addBook(): void {
        const selectedCategory = this.categories.find(p => p.id === this.categoryId.value);
        const selectedAuthor = this.authors.find(a => a.id === this.authorId.value);
        const selectedReleaseCompany = this.releaseCompanies.find(r => r.id === this.releaseCompanyId.value);
        const selectedPublisher = this.publishers.find(r => r.id === this.publisherId.value);
        const bookImages: BookImage[] = this.uploadedFiles.map(f => {
            const img: BookImage = {
                bookId: "",
                imageUrl: f.fileName,
                isActive: true
            };

            return img;
        });
        console.log("bookImages", bookImages);

        const storedBook: StoredBookModel = {
            book: {
                name: this.name.value,
                pageCount: this.pageCount.value,
                publishedYear: this.publishedYear.value,
                summary: this.summary.value,
                buyAddress: this.buyAddress.value,
                bookCategory: selectedCategory,
                author: selectedAuthor,
                releaseCompany: selectedReleaseCompany,
                publisher: selectedPublisher,
                isActive: this.isActive.value
            },
            images: bookImages
        };

        this.bookService.addBook(storedBook).subscribe((data) => {
            this.responseNotify = {
                isSuccess: true,
                message: "Book has been added successfuly"
            };
        },
        (err: Response) => {
            this.responseNotify = {
                isSuccess: false,
                message: err.statusText
            };
        });
    }

    private updateBook(): void {
        const selectedCategory = this.categories.find(p => p.id === this.categoryId.value);
        const selectedAuthor = this.authors.find(a => a.id === this.authorId.value);
        const selectedReleaseCompany = this.releaseCompanies.find(r => r.id === this.releaseCompanyId.value);
        const selectedPublisher = this.publishers.find(r => r.id === this.publisherId.value);
        const bookImages: BookImage[] = this.uploadedFiles.map(f => {
            const img: BookImage = {
                bookId: this.bookId,
                imageUrl: f.fileName,
                isActive: true
            };

            return img;
        });

        const payload: StoredBookModel = {
            book: {
                name: this.name.value,
                pageCount: this.pageCount.value,
                publishedYear: this.publishedYear.value,
                summary: this.summary.value,
                buyAddress: this.buyAddress.value,
                bookCategory: selectedCategory,
                author: selectedAuthor,
                releaseCompany: selectedReleaseCompany,
                publisher: selectedPublisher,
                isActive: this.isActive.value || false
            },
            images: bookImages
        };

        this.bookService.updateBook(this.bookId, payload)
            .subscribe((data) => {
                this.responseNotify = {
                    isSuccess: true,
                    message: "Book has been updated successfuly"
                };
            },
            (err: Response) => {
                this.responseNotify = {
                    isSuccess: false,
                    message: err.statusText
                };
            });
    }

    private createFormControls() {
        this.name = new FormControl("", Validators.required);
        this.pageCount = new FormControl("", [Validators.required, Validators.min(1)]);
        this.publishedYear = new FormControl("", Validators.min(1000));
        this.summary = new FormControl("");
        this.buyAddress = new FormControl("");
        this.categoryId = new FormControl("", Validators.required);
        this.authorId = new FormControl("", Validators.required);
        this.publisherId = new FormControl("", Validators.required);
        this.releaseCompanyId = new FormControl("", Validators.required);
        this.isActive = new FormControl(false);
    }

    private fillBook(model: StoredBookModel) {
        if (!model || !model.book) {
            return;
        }

        this.name.setValue(model.book.name);
        this.pageCount.setValue(model.book.pageCount);
        this.publishedYear.setValue(model.book.publishedYear);
        this.summary.setValue(model.book.summary);
        this.buyAddress.setValue(model.book.buyAddress);
        this.categoryId.setValue(model.book.bookCategory.id);
        this.authorId.setValue(model.book.author.id);
        this.publisherId.setValue(model.book.publisher.id);
        this.releaseCompanyId.setValue(model.book.releaseCompany ? model.book.releaseCompany.id : "");
        this.uploadedFiles = model.images.map(img => {
            return {
                id: img.id,
                fileName: img.imageUrl
            };
        });
        this.isActive.setValue(model.book.isActive);
    }

    private createForm() {
        this.bookForm = this.fb.group({
            name: this.name,
            pageCount: this.pageCount,
            publishedYear: this.publishedYear,
            summary: this.summary,
            buyAddress: this.buyAddress,
            categoryId: this.categoryId,
            authorId: this.authorId,
            publisherId: this.publisherId,
            releaseCompanyId: this.releaseCompanyId,
            isActive: this.isActive
        });
    }

    public clearForm() {
        this.uploadedFiles = [];
        this.bookForm.reset();
        this.categoryId.setValue("");
        this.authorId.setValue("");
        this.publisherId.setValue("");
        this.releaseCompanyId.setValue("");
    }
}
