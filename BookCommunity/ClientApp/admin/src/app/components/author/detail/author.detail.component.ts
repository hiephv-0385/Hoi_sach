import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { CountryService } from "../../../services/country.service";
import { AuthorService } from "../../../services/author.service";
import { UploadService } from "../../../services/upload.service";
import { Author, Country, ResponseNotify, ListResponse } from "../../../services/models";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";

@Component({
    selector: "app-author-detail",
    templateUrl: "./author.detail.component.html",
    styleUrls: ["./author.detail.component.css"]
})
export class AuthorDetailComponent implements OnInit {
    public authorForm: FormGroup;
    public responseNotify: ResponseNotify;

    public countries: Country[];

    fullName: FormControl;
    birthDay: FormControl;
    introduction: FormControl;
    picture: FormControl;
    countryId: FormControl;
    isActive: FormControl;

    private uploadedFileName: string;
    private authorId: string;

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
        this.route.params.subscribe(params => {
            if (!params["id"]) {
                return;
            }

            this.authorId = params["id"];
            const getAuthorRequest = this.authorService.getAuthor(this.authorId);
            const getCountriesRequest = this.countryService.getAllCountries();

            Observable.combineLatest<Author, ListResponse<Country>>(getAuthorRequest, getCountriesRequest)
                .subscribe(data => {
                    const author = data[0];
                    const countriesRes = data[1];
                    this.fillAuthor(data[0]);
                    if (countriesRes) {
                        this.countries = countriesRes.data;
                    }
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
        this.authorService.removePicture(this.uploadedFileName).subscribe(data => {
        },
        err => {
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
            this.saveAuthor();
        }
    }

    private addAuthor(): void {
        const selectedCountry = this.countries.find(c => c.id === this.countryId.value);
        const author: Author = {
            fullName: this.fullName.value,
            birthDay: this.birthDay.value,
            introduction: this.introduction.value,
            picture: this.uploadedFileName,
            country: selectedCountry,
            isActive: this.isActive.value || false,
        };

        this.authorService.addAuthor(author).subscribe((data) => {
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
            birthDay: this.birthDay.value,
            introduction: this.introduction.value,
            picture: this.uploadedFileName,
            country: selectedCountry,
            isActive: this.isActive.value || false
        };

        this.authorService.updateAuthor(this.countryId, payload).subscribe((data) => {
            this.responseNotify = {
                isSuccess: true,
                message: "Author has been updated successfuly"
            };
        },
        (err) => {
            this.responseNotify = {
                isSuccess: false,
                message: err.statusText
            };
        });
    }

    private createAuthorFormControls() {
        this.fullName = new FormControl("", Validators.required);
        this.birthDay = new FormControl("", Validators.required);
        this.introduction = new FormControl("", [
            Validators.required,
            Validators.min(100),
            Validators.max(1000)
        ]);
        this.picture = new FormControl("");
        this.countryId = new FormControl("");
        this.isActive = new FormControl(false);
    }

    private fillAuthor(author: Author) {
        if (!author) {
            return;
        }

        this.fullName.setValue(author.fullName);
        this.birthDay.setValue(author.birthDay);
        this.introduction.setValue(author.introduction);
        this.uploadedFileName = author.picture;
        this.isActive.setValue(author.isActive);
    }

    private createForm() {
        this.authorForm = this.fb.group({
            fullName: this.fullName,
            birthDay: this.birthDay,
            introduction: this.introduction,
            countryId: this.countryId,
            picture: this.picture,
            isActive: this.isActive
        });
    }

    public clearForm() {
        this.uploadedFileName = "";
        this.authorForm.reset();
    }
}
