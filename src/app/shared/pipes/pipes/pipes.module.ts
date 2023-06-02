import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FiltrationFormComponent} from "../../components/filtration-form/filtration-form.component";
import {EmployeeListItemComponent} from "../../components/employee-list-item/employee-list-item.component";
import {FiltrationEmployeesPipe} from "../filtration-employees.pipe";
import {SortingPipe} from "../sorting.pipe";
import {SearchEmployeesPipe} from "../search-employees.pipe";



@NgModule({
  declarations: [
    FiltrationEmployeesPipe,
    SortingPipe,
    SearchEmployeesPipe
  ],
  exports: [
    FiltrationEmployeesPipe,
    SortingPipe,
    SearchEmployeesPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
