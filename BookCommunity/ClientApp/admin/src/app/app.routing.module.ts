import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular2-datatable';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user/list/user.list.component';
import { UserDetailComponent } from './user/detail/user.detail.component';
import { ErrorCssDirective } from './directives/error.css.directive';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        UserListComponent,
        UserDetailComponent,
        ErrorCssDirective
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        DataTableModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'users/add', component: UserDetailComponent },
            { path: 'users', component: UserListComponent }
        ])
    ]
})
export class AppRoutingModule {
}
