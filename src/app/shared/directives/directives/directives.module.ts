import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomForDirective} from "../custom-for.directive";
import {AttributeDirective} from "../attribute.directive";
import {StyleDirective} from "../style.directive";



@NgModule({
  declarations: [
    CustomForDirective,
    AttributeDirective,
    CustomForDirective,
    StyleDirective
  ],
  exports: [
    StyleDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
