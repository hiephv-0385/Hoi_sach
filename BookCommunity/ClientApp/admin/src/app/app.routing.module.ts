import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { MomentModule } from "angular2-moment";
import { CookieService } from "angular2-cookie/services/cookies.service";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UserListComponent } from "./components/user/list/user.list.component";
import { UserDetailComponent } from "./components/user/detail/user.detail.component";
import { CountryListComponent } from "./components/country/list/country.list.component";
import { CountryDetailComponent } from "./components/country/detail/country.detail.component";
import { AuthorListComponent } from "./components/author/list/author.list.component";
import { AuthorDetailComponent } from "./components/author/detail/author.detail.component";
import { ReleaseCompanyListComponent } from "./components/releaseCompany/list/releaseCompany.list.component";
import { ReleaseCompanyDetailComponent } from "./components/releaseCompany/detail/releaseCompany.detail.component";
import { PublisherListComponent } from "./components/publisher/list/publisher.list.component";
import { PublisherDetailComponent } from "./components/publisher/detail/publisher.detail.component";
import { BookCategoryListComponent } from "./components/bookCategory/list/bookCategory.list.component";
import { BookCategoryDetailComponent } from "./components/bookCategory/detail/bookCategory.detail.component";

import { ErrorCssDirective } from "./directives/error.css.directive";
import { AlertMessageComponent } from "./directives/alers/alert.message.component";
import { ValidatorMessageComponent } from "./directives/validator.mesage/validator.message.component";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        UserListComponent,
        UserDetailComponent,
        CountryListComponent,
        CountryDetailComponent,
        AuthorListComponent,
        AuthorDetailComponent,
        ReleaseCompanyListComponent,
        ReleaseCompanyDetailComponent,
        PublisherListComponent,
        PublisherDetailComponent,
        BookCategoryListComponent,
        BookCategoryDetailComponent,
        AlertMessageComponent,
        ErrorCssDirective,
        ValidatorMessageComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        MomentModule,
        NgxPaginationModule,
        RouterModule.forRoot([
            { path: "", redirectTo: "dashboard", pathMatch: "full" },
            { path: "dashboard", component: DashboardComponent },
            { path: "users/add", component: UserDetailComponent },
            { path: "users/edit/:id", component: UserDetailComponent },
            { path: "users", component: UserListComponent },
            { path: "countries", component: CountryListComponent },
            { path: "countries/add", component: CountryDetailComponent },
            { path: "countries/edit/:id", component: CountryDetailComponent },
            { path: "authors", component: AuthorListComponent },
            { path: "authors/add", component: AuthorDetailComponent },
            { path: "authors/edit/:id", component: AuthorDetailComponent },
            { path: "releasecompanies", component: ReleaseCompanyListComponent },
            { path: "releasecompanies/add", component: ReleaseCompanyDetailComponent },
            { path: "releasecompanies/edit/:id", component: ReleaseCompanyDetailComponent },
            { path: "publishers", component: PublisherListComponent},
            { path: "publishers/add", component: PublisherDetailComponent },
            { path: "publishers/edit/:id", component: PublisherDetailComponent },
            { path: "bookcategories", component: BookCategoryListComponent},
            { path: "bookcategories/add", component: BookCategoryDetailComponent },
            { path: "bookcategories/edit/:id", component: BookCategoryDetailComponent }
        ])
    ],
    providers: [
        CookieService
    ],
})
export class AppRoutingModule {
}
