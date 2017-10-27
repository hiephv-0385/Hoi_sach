import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
<<<<<<< HEAD
=======
import { DashboardComponent } from './dashboard/dashboard.component';
>>>>>>> 8b31a2f1c183f052d9864f3efd4bafa634f4f221

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
