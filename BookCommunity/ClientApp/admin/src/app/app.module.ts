import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app.routing.module";

import { AuthService } from "./services/auth.service";
import { ConfimService } from "./services/confirm.service";
import { UserService } from "./services/user.service";
import { CountryService } from "./services/country.service";
import { AuthorService } from "./services/author.service";
import { ReleaseCompanyService } from "./services/releaseCompany.service";
import { PublisherService } from "./services/publisher.service";
import { BookCategoryService } from "./services/bookCategory.service";
import { BookService } from "./services/book.service";
import { UploadService } from "./services/upload.service";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    ConfimService,
    UserService,
    CountryService,
    ReleaseCompanyService,
    AuthorService,
    PublisherService,
    BookCategoryService,
    BookService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
