import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { MainPageComponent } from './main-page/main-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: [
    MainPageComponent,
    SettingsPageComponent
  ]
})
export class EmployeeModule {

}
