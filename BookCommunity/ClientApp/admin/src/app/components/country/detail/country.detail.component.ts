import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { CountryService } from "../../../services/country.service";
import { UploadService } from "../../../services/upload.service";
import { Country, ResponseNotify, ErrorInfo } from "../../../services/models";

@Component({
    selector: "app-country-detail",
    templateUrl: "./country.detail.component.html",
    styleUrls: ["./country.detail.component.css"]
})
export class CountryDetailComponent implements OnInit {
    public countryform: FormGroup;
    public responseNotify: ResponseNotify;

    name: FormControl;
    code: FormControl;
    sort: FormControl;
    flag: FormControl;
    isActive: FormControl;

    private uploadedFileName: string;
    private countryId: string;

    constructor(
        private countryService: CountryService,
        private uploadService: UploadService,
        protected fb: FormBuilder,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.createCountryFormControls();
        this.createForm();
        this.route.params.subscribe(params => {
            if (!params["id"]) {
                return;
            }

            this.countryId = params["id"];
            this.countryService.get<Country>(this.countryId).subscribe((data) => {
                this.fillCountry(data);
            });
         });
    }

    public saveCountry(): void {
        if (this.countryform.invalid) {
            return;
        }

        this.saveOrUpdate();
    }

    public onFileChange(event: any): void {
        const apiUrl = "/api/countries/flags";
        this.uploadService.uploadFile(event, apiUrl).subscribe((result) => {
            this.uploadedFileName = result.fileName;
        });
    }

    public removeFlag(): void {
        const apiUrl = "/api/countries/flags/remove";
        this.uploadService.removeFile(this.uploadedFileName, apiUrl).subscribe(data => {
        },
        (err: ErrorInfo) => {
            this.responseNotify = {
                isSuccess: false,
                message: `Remove avatar error: ${err.message}`
            };
        });
        this.uploadedFileName = "";
    }

    private saveOrUpdate(): void {
        if (this.countryId) {
            this.updateCountry();
        } else {
            this.addCountry();
        }
    }

    private addCountry(): void {
        const country: Country = {
            name: this.name.value,
            code: this.code.value,
            sort: this.sort.value,
            flag: this.uploadedFileName,
            isActive: this.isActive.value || false,
        };

        this.countryService.add<Country>(country).subscribe((data) => {
            this.responseNotify = {
                isSuccess: true,
                message: "User has been added successfuly"
            };
        },
        (err: ErrorInfo) => {
            this.responseNotify = {
                isSuccess: false,
                message: err.message
            };
        });
    }

    private updateCountry(): void {
        const payload: Country = {
            name: this.name.value,
            code: this.code.value,
            sort: this.sort.value,
            flag: this.uploadedFileName,
            isActive: this.isActive.value || false
        };

        this.countryService.update<Country>(this.countryId, payload).subscribe((data) => {
            this.responseNotify = {
                isSuccess: true,
                message: "User has been updated successfuly"
            };
        },
        (err: ErrorInfo) => {
            this.responseNotify = {
                isSuccess: false,
                message: err.message
            };
        });
    }

    private createCountryFormControls() {
        this.name = new FormControl("", Validators.required);
        this.code = new FormControl("", Validators.required);
        this.sort = new FormControl("", [
            Validators.required,
            Validators.min(1),
            Validators.max(250)
        ]);
        this.flag = new FormControl("");
        this.isActive = new FormControl(false);
    }

    private fillCountry(country: Country) {
        if (!country) {
            return;
        }

        this.name.setValue(country.name);
        this.code.setValue(country.code);
        this.sort.setValue(country.sort);
        this.uploadedFileName = country.flag;
        this.isActive.setValue(country.isActive);
    }

    private createForm() {
        this.countryform = this.fb.group({
            name: this.name,
            code: this.code,
            sort: this.sort,
            flag: this.flag,
            isActive: this.isActive
        });
    }

    public clearForm() {
        this.uploadedFileName = "";
        this.countryform.reset();
    }
}
