import { Pipe, PipeTransform } from '@angular/core';
import {Employee} from "../interfaces/employee-interfaces";
import {Params} from "@angular/router";

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(employees: Employee[], param: string): unknown {
    //   if (param === 'alphabet') {
    //     return employees.sort(function (employee1, employee2) {
    //       const textA = employee1.DepartmentName.toUpperCase();
    //       const textB = employee2.DepartmentName.toUpperCase();
    //       return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    //     })
    //   }
    // }
    return employees
  }
}
