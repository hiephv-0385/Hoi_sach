import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { BookCategoryService } from "../../../services/bookCategory.service";
import { UploadService } from "../../../services/upload.service";
import { BookCategory, ResponseNotify, GetBookCategoryParams, ErrorInfo } from "../../../services/models";

@Component({
    selector: "app-book-category-detail",
    templateUrl: "./bookCategory.detail.component.html",
    styleUrls: ["./bookCategory.detail.component.css"]
})
export class BookCategoryDetailComponent implements OnInit {
    public categoryForm: FormGroup;
    public responseNotify: ResponseNotify;
    public categoryId: string;
    public category: BookCategory;
    public selectedParentCategory: BookCategory;
    public parentCategories: BookCategory[] = [];

    private uploadedFileName: string;

    name: FormControl;
    sort: FormControl;
    picture: FormControl;
    parentId: FormControl;
    isActive: FormControl;

    constructor(
        private bookCategoryService: BookCategoryService,
        private uploadService: UploadService,
        protected fb: FormBuilder,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
        const searchParams: GetBookCategoryParams = {
            offset: 0,
            parentId: ""
        };
        this.bookCategoryService.searchBookCategories(searchParams).subscribe(result => {
            this.parentCategories = result;
        });
        this.route.params.subscribe(params => {
            if (!params["id"]) {
                return;
            }

            this.categoryId = params["id"];
            this.bookCategoryService.get<BookCategory>(this.categoryId).subscribe(data => {
                this.category = data;
                this.fillBookCategory(data);
            });
        });
    }

    public saveBookCategory(): void {
        if (this.categoryForm.invalid) {
            return;
        }

        this.saveOrUpdate();
    }

    public onFileChange(event: any): void {
        const apiUrl = "/api/bookcategories/pictures";
        this.uploadService.uploadFile(event, apiUrl).subscribe((result) => {
            this.uploadedFileName = result.fileName;
        });
    }

    public removePicture(): void {
        const apiUrl = "/api/bookcategories/pictures/remove";
        this.uploadService.removeFile(this.uploadedFileName, apiUrl).subscribe(data => {
        },
        (err: ErrorInfo) => {
            this.responseNotify = {
                isSuccess: false,
                message: err.message
            };
        });
        this.uploadedFileName = "";
    }

    private saveOrUpdate(): void {
        if (this.categoryId) {
            this.updateBookCategory();
        } else {
            this.addBookCategory();
        }
    }

    private addBookCategory(): void {
        this.selectedParentCategory = this.parentCategories.find(p => p.id === this.parentId.value);
        const category: BookCategory = {
            name: this.name.value,
            sort: this.sort.value,
            picture: this.uploadedFileName,
            parent: this.selectedParentCategory,
            isActive: this.isActive.value || false,
        };

        this.bookCategoryService.add<BookCategory>(category).subscribe((data) => {
            this.responseNotify = {
                isSuccess: true,
                message: "Book category has been added successfuly"
            };
        },
        (err: ErrorInfo) => {
            this.responseNotify = {
                isSuccess: false,
                message: err.message
            };
        });
    }

    private updateBookCategory(): void {
        this.selectedParentCategory = this.parentCategories.find(p => p.id === this.parentId.value);
        const payload: BookCategory = {
            name: this.name.value,
            sort: this.sort.value,
            picture: this.uploadedFileName,
            parent: this.selectedParentCategory,
            isActive: this.isActive.value || false
        };

        this.bookCategoryService.update<BookCategory>(this.categoryId, payload)
            .subscribe((data) => {
                this.responseNotify = {
                    isSuccess: true,
                    message: "Book category has been updated successfuly"
                };
            },
            (err: ErrorInfo) => {
                this.responseNotify = {
                    isSuccess: false,
                    message: err.message
                };
            });
    }

    private createFormControls() {
        this.name = new FormControl("", Validators.required);
        this.sort = new FormControl("", [Validators.required, Validators.min(1)]);
        this.picture = new FormControl("");
        this.parentId = new FormControl("");
        this.isActive = new FormControl(false);
    }

    private fillBookCategory(category: BookCategory) {
        if (!category) {
            return;
        }

        this.name.setValue(category.name);
        this.sort.setValue(category.sort);
        this.uploadedFileName = category.picture;
        if (category.parent) {
            this.parentId.setValue(category.parent.id);
        }
        this.isActive.setValue(category.isActive);
    }

    private createForm() {
        this.categoryForm = this.fb.group({
            name: this.name,
            sort: this.sort,
            picture: this.picture,
            parentId: this.parentId,
            isActive: this.isActive
        });
    }

    public clearForm() {
        this.uploadedFileName = "";
        this.categoryForm.reset();
        this.parentId.setValue("");
    }
}
