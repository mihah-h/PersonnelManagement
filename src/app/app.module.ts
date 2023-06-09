import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ValidationMessageComponent } from "./shared/components/validation-message/validation-message.component";
import { AuthService } from "./shared/services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { EmployeeService } from "./shared/services/employee.service";
import { FiltrationFormComponent } from "./shared/components/filtration-form/filtration-form.component";
import { EmployeeListItemComponent } from "./shared/components/employee-list-item/employee-list-item.component";
import { SharedModule } from "./shared/shared.module";
import { PipesModule } from "./shared/pipes/pipes/pipes.module";
import { DirectivesModule } from "./shared/directives/directives/directives.module";
import { GuardAuth } from "./shared/services/guard.auth";
import { GlobalErrorHandlerService } from "./shared/services/global-error-handler.service";
import { ErrorMessageDynamicService } from "./shared/services/error-message-dynamic.service";
import { ErrorMessageDynamicComponent } from "./shared/components/error-message-dynamic/error-message-dynamic.component";
import { PopupWindowFirstComponent } from "./shared/components/popup-window-first/popup-window-first.component";
import { PopupWindowSecondComponent } from './shared/components/popup-window-second/popup-window-second.component';
import { API_URL } from "./shared/provider";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RefactorCompanyHistoryPopupWindowComponent } from './shared/components/refactor-company-history-popup-window/refactor-company-history-popup-window.component';
import { AddCompanyHistoryPopupWindowComponent } from './shared/components/add-company-history-popup-window/add-company-history-popup-window.component';
import { AdminService } from "./shared/services/admin.service";
import { RefactorAdminEmailPopupWindowComponent } from './shared/components/refactor-admin-email-popup-window/refactor-admin-email-popup-window.component';
import { RefactorCompanyNamePopupWindowComponent } from './shared/components/refactor-compony-name-popup-window/refactor-company-name-popup-window.component';

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
    ErrorMessageDynamicComponent,
    PopupWindowFirstComponent,
    PopupWindowSecondComponent,
    RefactorCompanyHistoryPopupWindowComponent,
    AddCompanyHistoryPopupWindowComponent,
    RefactorAdminEmailPopupWindowComponent,
    RefactorCompanyNamePopupWindowComponent
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
    DirectivesModule,
    BrowserAnimationsModule,
    NgxSkeletonLoaderModule

  ],

  providers: [
    AuthService,
    EmployeeService,
    GuardAuth,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    { provide: API_URL, useFactory: () => 'http://localhost:3000' },
    ErrorMessageDynamicService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
