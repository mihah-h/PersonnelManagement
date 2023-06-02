import { Pipe, PipeTransform } from '@angular/core';
import {Employee} from "../interfaces/employee-interfaces";

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(employees: Employee[], numberDisplayedItems: number, pageNumber: number): Employee[] {
    return employees.slice(pageNumber)
  }

}
