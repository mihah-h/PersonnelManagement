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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ValidationMessageComponent } from "./shared/components/validation-message/validation-message.component";
import { AuthService } from "./shared/services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {EmployeeService} from "./shared/services/employee.service";
import {FiltrationFormComponent} from "./shared/components/filtration-form/filtration-form.component";
import {EmployeeListItemComponent} from "./shared/components/employee-list-item/employee-list-item.component";
import {SharedModule} from "./shared/shared.module";
import {PipesModule} from "./shared/pipes/pipes/pipes.module";
import {DirectivesModule} from "./shared/directives/directives/directives.module";
<<<<<<< Updated upstream
import {GuardAuth} from "./shared/services/guard.auth";
=======
<<<<<<< HEAD
import { AttributeDirective } from './shared/directives/directives/attribute.directive';
=======
import {GuardAuth} from "./shared/services/guard.auth";
>>>>>>> f5208b6ccafb9e9312aee26883324b33bb211aef
>>>>>>> Stashed changes

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
    FiltrationFormComponent,
    EmployeeListItemComponent,
    AttributeDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ValidationMessageComponent,
    HttpClientModule,
    FormsModule,
    SharedModule,
    PipesModule,
    DirectivesModule

  ],
  providers: [AuthService, EmployeeService, GuardAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
