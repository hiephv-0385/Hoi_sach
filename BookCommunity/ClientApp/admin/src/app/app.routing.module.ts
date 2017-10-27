<<<<<<< HEAD
import { NgModule } from '@angular/core';
=======
﻿import { NgModule } from '@angular/core';
>>>>>>> 8b31a2f1c183f052d9864f3efd4bafa634f4f221
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
<<<<<<< HEAD
import { UserComponent } from './user/user.component';
=======
>>>>>>> 8b31a2f1c183f052d9864f3efd4bafa634f4f221

@NgModule({
    declarations: [
        AppComponent,
<<<<<<< HEAD
        DashboardComponent,
        UserComponent
=======
        DashboardComponent
>>>>>>> 8b31a2f1c183f052d9864f3efd4bafa634f4f221
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: 'admin', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
<<<<<<< HEAD
            { path: 'user', component: UserComponent }
=======
>>>>>>> 8b31a2f1c183f052d9864f3efd4bafa634f4f221
        ])
    ]
})
export class AppRoutingModule {
}
