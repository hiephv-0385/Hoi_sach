import * as moment from "moment";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { CountryService } from "../../../services/country.service";
import { AuthorService } from "../../../services/author.service";
import { UploadService } from "../../../services/upload.service";
import { Author, Country, ResponseNotify, ListResponse } from "../../../services/models";

@Component({
    selector: "app-author-detail",
    templateUrl: "./author.detail.component.html",
    styleUrls: ["./author.detail.component.css"]
})
export class AuthorDetailComponent implements OnInit {
    public authorForm: FormGroup;
    public responseNotify: ResponseNotify;
    public countries: Country[];
    public authorId: string;
    public author: Author;

    private uploadedFileName: string;

    fullName: FormControl;
    birthday: FormControl;
    introduction: FormControl;
    picture: FormControl;
    countryId: FormControl;
    isActive: FormControl;

    constructor(
        private countryService: CountryService,
        private authorService: AuthorService,
        private uploadService: UploadService,
        protected fb: FormBuilder,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.createAuthorFormControls();
        this.createForm();
        this.countryService.getList<Country>({ offset: 0 }).subscribe(result => {
            this.countries = result.items;
        });
        this.route.params.subscribe(params => {
            if (!params["id"]) {
                return;
            }

            this.authorId = params["id"];
            this.authorService.get<Author>(this.authorId).subscribe(data => {
                this.author = data;
                this.fillAuthor(data);
            });
        });
    }

    public saveAuthor(): void {
        if (this.authorForm.invalid) {
            return;
        }

        this.saveOrUpdate();
    }

    public onFileChange(event: any): void {
        const apiUrl = "/api/authors/pictures";
        this.uploadService.uploadFile(event, apiUrl).subscribe((result) => {
            this.uploadedFileName = result.fileName;
        });
    }

    public removePicture(): void {
        const apiUrl = "/api/authors/pictures/remove";
        this.uploadService.removeFile(this.uploadedFileName, apiUrl).subscribe(data => {
        },
        (err: Response) => {
            this.responseNotify = {
                isSuccess: false,
                message: `Remove avatar error: ${err.statusText}`
            };
        });
        this.uploadedFileName = "";
    }

    private saveOrUpdate(): void {
        if (this.authorId) {
            this.updateAuthor();
        } else {
            this.addAuthor();
        }
    }

    private addAuthor(): void {
        const selectedCountry = this.countries.find(c => c.id === this.countryId.value);
        const author: Author = {
            fullName: this.fullName.value,
            birthday: this.birthday.value,
            introduction: this.introduction.value,
            picture: this.uploadedFileName,
            country: selectedCountry,
            isActive: this.isActive.value || false,
        };

        this.authorService.add<Author>(author).subscribe((data) => {
            this.responseNotify = {
                isSuccess: true,
                message: "Author has been added successfuly"
            };
        },
        (err: Response) => {
            this.responseNotify = {
                isSuccess: false,
                message: err.statusText
            };
        });
    }

    private updateAuthor(): void {
        const selectedCountry = this.countries.find(c => c.id === this.countryId.value);
        const payload: Author = {
            fullName: this.fullName.value,
            birthday: this.birthday.value,
            introduction: this.introduction.value,
            picture: this.uploadedFileName,
            country: selectedCountry,
            isActive: this.isActive.value || false
        };

        this.authorService.update<Author>(this.authorId, payload).subscribe((data) => {
            this.responseNotify = {
                isSuccess: true,
                message: "Author has been updated successfuly"
            };
        },
        (err: Response) => {
            this.responseNotify = {
                isSuccess: false,
                message: err.statusText
            };
        });
    }

    private createAuthorFormControls() {
        this.fullName = new FormControl("", Validators.required);
        this.birthday = new FormControl("", Validators.required);
        this.introduction = new FormControl("", [
            Validators.required,
            Validators.min(100),
            Validators.max(1000)
        ]);
        this.picture = new FormControl("");
        this.countryId = new FormControl("", Validators.required);
        this.isActive = new FormControl(false);
    }

    private fillAuthor(author: Author) {
        if (!author) {
            return;
        }

        this.fullName.setValue(author.fullName);
        const date = moment(author.birthday).format("YYYY-MM-DD");
        this.birthday.setValue(date);
        this.introduction.setValue(author.introduction);
        this.countryId.setValue(author.country.id);
        this.uploadedFileName = author.picture;
        this.isActive.setValue(author.isActive);
    }

    private createForm() {
        this.authorForm = this.fb.group({
            fullName: this.fullName,
            birthday: this.birthday,
            introduction: this.introduction,
            countryId: this.countryId,
            picture: this.picture,
            isActive: this.isActive
        });
    }

    public clearForm() {
        this.uploadedFileName = "";
        this.authorForm.reset();
        this.countryId.setValue("");
    }
}
