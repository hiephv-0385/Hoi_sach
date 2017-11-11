import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { ReleaseCompanyService } from "../../../services/releaseCompany.service";
import {
    ReleaseCompany,
    ResponseNotify,
    GetReleaseCompaniesParams,
    ListResponse
} from "../../../services/models";

@Component({
  selector: "app-releasecompany-list",
  templateUrl: "./releaseCompany.list.component.html",
  styleUrls: ["./releaseCompany.list.component.css"]
})
export class ReleaseCompanyListComponent implements OnInit {
    public releaseCompanyList: ListResponse<ReleaseCompany>;
    public responseNotify: ResponseNotify;
    public page = 1;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private releaseCompanyService: ReleaseCompanyService
    ) {
     }

    ngOnInit() {
        const params: GetReleaseCompaniesParams = {
            offset: 0,
            limit: 10
        };
        this.releaseCompanyService.getReleaseCompanies(params).subscribe((result) => {
            if (!result.data) {
                return;
            }

            const extReleaseCompanies = result.data.map(item => <ReleaseCompany>item);
            this.releaseCompanyList = {
                count: result.count,
                data: extReleaseCompanies
            };
        });
    }

    public addReleaseCompany(): void {
        this.router.navigate(["/releasecompanies"])
            .then(() => this.router.navigate(["/releasecompanies/add"], { replaceUrl: true }));
    }

    public deleteReleaseCompanies(): void {
        const deletedReleaseCompanyIds = this.releaseCompanyList.data
            .filter(c => c.isChecked)
            .map(c => c.id);
        this.releaseCompanyService.deleteReleaseCompanies(deletedReleaseCompanyIds)
            .subscribe((data) => {
                this.releaseCompanyList.data = this.releaseCompanyList.data
                    .filter(u => !deletedReleaseCompanyIds.includes(u.id, 0));
                this.releaseCompanyList.count = this.releaseCompanyList.count - deletedReleaseCompanyIds.length;
                this.responseNotify = {
                    isSuccess: true,
                    message: "Release companies have delete successfuly"
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
        const params: GetReleaseCompaniesParams = {
            offset: (this.page - 1) * limit,
            limit: limit
        };

        this.releaseCompanyService.getReleaseCompanies(params).subscribe((result) => {
            this.releaseCompanyList = result;
        });
    }
}
