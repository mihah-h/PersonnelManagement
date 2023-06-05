import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomForDirective} from "../custom-for.directive";
import {AttributeDirective} from "../attribute.directive";
import {StyleDirective} from "../style.directive";



@NgModule({
  declarations: [
    AttributeDirective,
    CustomForDirective,
    StyleDirective
  ],
  exports: [
    StyleDirective,
    CustomForDirective,
    AttributeDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
