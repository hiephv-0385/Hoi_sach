import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { CountryService } from "../../../services/country.service";
import { ReleaseCompanyService } from "../../../services/releaseCompany.service";
import { UploadService } from "../../../services/upload.service";
import { ReleaseCompany, Country, ResponseNotify, ErrorInfo } from "../../../services/models";

@Component({
    selector: "app-releasecompany-detail",
    templateUrl: "./releaseCompany.detail.component.html",
    styleUrls: ["./releaseCompany.detail.component.css"]
})
export class ReleaseCompanyDetailComponent implements OnInit {
    public releaseCompanyForm: FormGroup;
    public responseNotify: ResponseNotify;
    public countries: Country[];
    public releaseCompanyId: string;
    public releaseCompany: ReleaseCompany;

    private uploadedFileName: string;

    name: FormControl;
    logo: FormControl;
    countryId: FormControl;
    isActive: FormControl;

    constructor(
        private releaseCompanyService: ReleaseCompanyService,
        private countryService: CountryService,
        private uploadService: UploadService,
        protected fb: FormBuilder,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
        this.countryService.getList<Country>({ offset: 0 }).subscribe(result => {
            this.countries = result.items;
        });
        this.route.params.subscribe(params => {
            if (!params["id"]) {
                return;
            }

            this.releaseCompanyId = params["id"];
            this.releaseCompanyService.get<ReleaseCompany>(this.releaseCompanyId).subscribe(data => {
                this.releaseCompany = data;
                this.fillReleaseCompany(data);
            });
        });
    }

    public saveReleaseCompany(): void {
        if (this.releaseCompanyForm.invalid) {
            return;
        }

        this.saveOrUpdate();
    }

    public onFileChange(event: any): void {
        const apiUrl = "/api/admin/releasecompanies/logos";
        this.uploadService.uploadFile(event, apiUrl).subscribe((result) => {
            this.uploadedFileName = result.fileName;
        });
    }

    public removeLogo(): void {
        const apiUrl = "/api/admin/releasecompanies/logos/remove";
        this.uploadService.removeFile(this.uploadedFileName, apiUrl).subscribe(data => {
        },
        (err: ErrorInfo) => {
            this.responseNotify = {
                isSuccess: false,
                message: `Remove logo error: ${err.message}`
            };
        });
        this.uploadedFileName = "";
    }

    private saveOrUpdate(): void {
        if (this.releaseCompanyId) {
            this.updateReleaseCompany();
        } else {
            this.addReleaseCompany();
        }
    }

    private addReleaseCompany(): void {
        const selectedCountry = this.countries.find(c => c.id === this.countryId.value);
        const relseaseCompany: ReleaseCompany = {
            name: this.name.value,
            logo: this.uploadedFileName,
            country: selectedCountry,
            isActive: this.isActive.value || false,
        };

        this.releaseCompanyService.add(relseaseCompany).subscribe((data) => {
            this.responseNotify = {
                isSuccess: true,
                message: "Release company has been added successfuly"
            };
        },
        (err: ErrorInfo) => {
            this.responseNotify = {
                isSuccess: false,
                message: err.message
            };
        });
    }

    private updateReleaseCompany(): void {
        const selectedCountry = this.countries.find(c => c.id === this.countryId.value);
        const payload: ReleaseCompany = {
            name: this.name.value,
            logo: this.uploadedFileName,
            country: selectedCountry,
            isActive: this.isActive.value || false
        };

        this.releaseCompanyService.update(this.releaseCompanyId, payload)
            .subscribe((data) => {
                this.responseNotify = {
                    isSuccess: true,
                    message: "Release company has been updated successfuly"
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
        this.logo = new FormControl("");
        this.countryId = new FormControl("", Validators.required);
        this.isActive = new FormControl(false);
    }

    private fillReleaseCompany(releaseCompany: ReleaseCompany) {
        if (!releaseCompany) {
            return;
        }

        this.name.setValue(releaseCompany.name);
        this.uploadedFileName = releaseCompany.logo;
        this.countryId.setValue(releaseCompany.country.id);
        this.isActive.setValue(releaseCompany.isActive);
    }

    private createForm() {
        this.releaseCompanyForm = this.fb.group({
            name: this.name,
            logo: this.logo,
            countryId: this.countryId,
            isActive: this.isActive
        });
    }

    public clearForm() {
        this.uploadedFileName = "";
        this.releaseCompanyForm.reset();
        this.countryId.setValue("");
    }
}
