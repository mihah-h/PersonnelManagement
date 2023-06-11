import { NgModule } from '@angular/core';
import { ErrorMessageDynamicComponent } from './components/error-message-dynamic/error-message-dynamic.component';
import { PopupWindowFirstComponent } from './components/popup-window-first/popup-window-first.component';
import { ReactiveFormsModule } from "@angular/forms";
import { PopupWindowSecondComponent } from './components/popup-window-second/popup-window-second.component';
import { NgForOf, NgIf } from "@angular/common";
import { AddCompanyHistoryPopupWindowComponent } from './components/add-company-history-popup-window/add-company-history-popup-window.component';
import { ValidationMessageComponent } from "./components/validation-message/validation-message.component";
import { RefactorCompanyHistoryPopupWindowComponent } from './components/refactor-company-history-popup-window/refactor-company-history-popup-window.component';
import { RefactorCompanyNamePopupWindowComponent } from './components/refactor-compony-name-popup-window/refactor-company-name-popup-window.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    ValidationMessageComponent

  ],
  exports: [
  ],
  declarations: [

  ],
})
export class SharedModule {

}
