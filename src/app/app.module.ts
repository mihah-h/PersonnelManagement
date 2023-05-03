import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ListEmployeesPageComponent } from './list-employees-page/list-employees-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { AddingEmployeePageComponent } from './adding-employee-page/adding-employee-page.component';
import { EmployeeAddedPageComponent } from './employee-added-page/employee-added-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ListEmployeesPageComponent,
    SettingsPageComponent,
    EmployeePageComponent,
    AddingEmployeePageComponent,
    EmployeeAddedPageComponent,
    RegistrationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
