import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegistrationPageComponent } from "./registration-page/registration-page.component";
import { ListEmployeesPageComponent } from "./list-employees-page/list-employees-page.component";
import { EmployeePageComponent } from "./employee-page/employee-page.component";
import { AddingEmployeePageComponent } from "./adding-employee-page/adding-employee-page.component";
import { EmployeeAddedPageComponent } from "./employee-added-page/employee-added-page.component";
import { SettingsPageComponent } from "./settings-page/settings-page.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'admin', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/list-employees', pathMatch: 'full'},
      {path: 'list-employees', component: ListEmployeesPageComponent},
      {path: 'adding-employee', component: AddingEmployeePageComponent},
      {path: 'employee-added', component: EmployeeAddedPageComponent},
      {path: 'settings', component: SettingsPageComponent},
      {path: 'employee/:id', component: EmployeePageComponent},
    ]},
  {
    path: 'employee',
    loadChildren: () => import('../app/employee/employee.module').then(x => x.EmployeeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
