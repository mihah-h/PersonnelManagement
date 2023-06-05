import { NgModule } from '@angular/core';
import { ErrorMessageDynamicComponent } from './components/error-message-dynamic/error-message-dynamic.component';
import { PopupWindowFirstComponent } from './components/popup-window-first/popup-window-first.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PopupWindowSecondComponent } from './components/popup-window-second/popup-window-second.component';
import {NgForOf, NgIf} from "@angular/common";

@NgModule({
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf

  ],
  exports: [
  ],
  declarations: [



  ],
})
export class SharedModule {

}
