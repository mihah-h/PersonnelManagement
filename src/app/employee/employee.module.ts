import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RouterModule } from "@angular/router";
import { EmployeeLayoutComponent } from './shared/components/employee-layout/employee-layout.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', component: EmployeeLayoutComponent, children: [
          {path: '', redirectTo: '/employee', pathMatch: 'full'},
          {path: '', component: ProfilePageComponent},
          {path: 'settings', component: SettingsPageComponent}
        ]}
    ])
  ],
  exports: [],
  declarations: [
    SettingsPageComponent,
    ProfilePageComponent,
    EmployeeLayoutComponent,
  ]
})
export class EmployeeModule {}
