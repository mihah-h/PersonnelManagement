import { Pipe, PipeTransform } from "@angular/core";
import {Employee} from "../interfaces/employee-interfaces";

@Pipe({
  name: 'searchEmployees'
})
export class SearchEmployeesPipe implements PipeTransform{
  transform(employees: Employee[], search = ''): Employee[] {
    if (!search.trim()) {
      return employees
    }

    return employees.filter(employee => {
      return employee.surname.toLowerCase().includes(search.toLowerCase())
    })
  }

}
