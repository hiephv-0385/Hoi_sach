import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { CookieService } from "angular2-cookie/services/cookies.service";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UserListComponent } from "./components/user/list/user.list.component";
import { UserDetailComponent } from "./components/user/detail/user.detail.component";
import { ErrorCssDirective } from "./directives/error.css.directive";
import { AlertMessageComponent } from "./directives/alers/alert.message.component";
import { ValidatorMessageComponent } from "./directives/validator.mesage/validator.message.component";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        UserListComponent,
        UserDetailComponent,
        AlertMessageComponent,
        ErrorCssDirective,
        ValidatorMessageComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        RouterModule.forRoot([
            { path: "", redirectTo: "dashboard", pathMatch: "full" },
            { path: "dashboard", component: DashboardComponent },
            { path: "users/add", component: UserDetailComponent },
            { path: "users/edit/:id", component: UserDetailComponent },
            { path: "users", component: UserListComponent }
        ])
    ],
    providers: [
        CookieService
    ],
})
export class AppRoutingModule {
}
