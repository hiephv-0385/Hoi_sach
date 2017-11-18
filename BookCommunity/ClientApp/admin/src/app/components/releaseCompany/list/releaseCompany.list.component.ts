import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { ReleaseCompanyService } from "../../../services/releaseCompany.service";
import {
    ReleaseCompany,
    ResponseNotify,
    GetReleaseCompaniesParams,
    ListResponse,
    ErrorInfo
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
        this.releaseCompanyService.getList<ReleaseCompany>(params).subscribe((result) => {
            if (!result.items) {
                return;
            }

            const extReleaseCompanies = result.items.map(item => <ReleaseCompany>item);
            this.releaseCompanyList = {
                count: result.count,
                items: extReleaseCompanies
            };
        });
    }

    public addReleaseCompany(): void {
        this.router.navigate(["/releasecompanies"])
            .then(() => this.router.navigate(["/releasecompanies/add"], { replaceUrl: true }));
    }

    public deleteReleaseCompanies(): void {
        const deletedReleaseCompanyIds = this.releaseCompanyList.items
            .filter(c => c.isChecked)
            .map(c => c.id);
        this.releaseCompanyService.deleteMany(deletedReleaseCompanyIds)
            .subscribe((data) => {
                this.releaseCompanyList.items = this.releaseCompanyList.items
                    .filter(u => !deletedReleaseCompanyIds.includes(u.id, 0));
                this.releaseCompanyList.count = this.releaseCompanyList.count - deletedReleaseCompanyIds.length;
                this.responseNotify = {
                    isSuccess: true,
                    message: "Release companies have delete successfuly"
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
        const params: GetReleaseCompaniesParams = {
            offset: (this.page - 1) * limit,
            limit: limit
        };

        this.releaseCompanyService.getList<ReleaseCompany>(params).subscribe((result) => {
            this.releaseCompanyList = result;
        });
    }
}
