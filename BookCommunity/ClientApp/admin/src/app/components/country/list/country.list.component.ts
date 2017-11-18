import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { CountryService } from "../../../services/country.service";
import {
    Country,
    ResponseNotify,
    GetCountriesParams,
    ListResponse,
    ErrorInfo
} from "../../../services/models";

@Component({
  selector: "app-country-list",
  templateUrl: "./country.list.component.html",
  styleUrls: ["./country.list.component.css"]
})
export class CountryListComponent implements OnInit {
    public countryList: ListResponse<Country>;
    public responseNotify: ResponseNotify;
    public page = 1;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private countryService: CountryService
    ) {
    }

    ngOnInit() {
        const params: GetCountriesParams = {
            offset: 0,
            limit: 10
        };
        this.countryService.getList<Country>(params).subscribe((result) => {
            if (!result.items) {
                return;
            }

            const extCountries = result.items.map(item => <Country>item);
            this.countryList = {
                count: result.count,
                items: extCountries
            };
        });
    }

    public addCountry(): void {
        this.router.navigate(["/countries"])
            .then(() => this.router.navigate(["/countries/add"], { replaceUrl: true }));
    }

    public deleteCountry(): void {
        const deletedCountryIds = this.countryList.items.filter(c => c.isChecked).map(c => c.id);
        this.countryService.deleteMany(deletedCountryIds).subscribe((data) => {
            this.countryList.items = this.countryList.items.filter(u => !deletedCountryIds.includes(u.id, 0));
            this.countryList.count = this.countryList.count - deletedCountryIds.length;
            this.responseNotify = {
                isSuccess: true,
                message: "Countries have delete successfuly"
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
        const params: GetCountriesParams = {
            offset: (this.page - 1) * limit,
            limit: limit
        };

        this.countryService.getList<Country>(params).subscribe((result) => {
            this.countryList = result;
        });
    }
}
