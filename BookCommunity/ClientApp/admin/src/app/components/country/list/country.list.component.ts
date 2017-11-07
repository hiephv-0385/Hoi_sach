import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { CountryService } from "../../../services/country.service";
import {
    Country,
    ExtendedCountry,
    ResponseNotify,
    GetCountriesParams,
    CountryListResponse
} from "../../../services/models";

@Component({
  selector: "app-country-list",
  templateUrl: "./country.list.component.html",
  styleUrls: ["./country.list.component.css"]
})
export class CountryListComponent implements OnInit {
    public countryList: CountryListResponse;
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
            limit: 5
        };
        this.countryService.getCountries(params).subscribe((result) => {
            if (!result.data) {
                return;
            }

            const extCountries = result.data.map(item => <ExtendedCountry>item);
            this.countryList = {
                count: result.count,
                data: extCountries
            };
        });
    }

    public addCountry(): void {
        this.router.navigate(["/countries"])
            .then(() => this.router.navigate(["/countries/add"], { replaceUrl: true }));
    }

    public deleteCountry(): void {
        const deletedCountryIds = this.countryList.data.filter(c => c.isChecked).map(c => c.id);
        this.countryService.deleteCountries(deletedCountryIds).subscribe((data) => {
            this.countryList.data = this.countryList.data.filter(u => !deletedCountryIds.includes(u.id, 0));
            this.countryList.count = this.countryList.count - deletedCountryIds.length;
            this.responseNotify = {
                isSuccess: true,
                message: "Countries have delete successfuly"
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
        const limit = 5;
        this.page = +$event;
        const params: GetCountriesParams = {
            offset: (this.page - 1) * limit,
            limit: limit
        };

        this.countryService.getCountries(params).subscribe((result) => {
            this.countryList = result;
        });
    }
}
