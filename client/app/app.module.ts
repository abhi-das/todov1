import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppDataService } from './services/app.data.service';
import { AppRoutingModule } from './app.routing';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  providers: [ AppDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
