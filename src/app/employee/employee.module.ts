import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: [
    SettingsPageComponent,
    ProfilePageComponent
  ]
})
export class EmployeeModule {

}
