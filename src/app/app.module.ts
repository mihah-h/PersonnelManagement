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
import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";
import { SearchEmployeesPipe } from "./shared/pipes/search-employees.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { ValidationMessageComponent } from "./shared/components/validation-message/validation-message.component";
import { AuthApiService } from "./shared/services/auth-api.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ListEmployeesPageComponent,
    SettingsPageComponent,
    EmployeePageComponent,
    AddingEmployeePageComponent,
    EmployeeAddedPageComponent,
    RegistrationPageComponent,
    AdminLayoutComponent,
    SearchEmployeesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ValidationMessageComponent,
    HttpClientModule,
  ],
  providers: [AuthApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
