import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'searchEmployees'
})
export class SearchEmployeesPipe implements PipeTransform{
  transform(employees: string[], search = ''): any {
    if (!search.trim()) {
      return employees
    }

    return employees.filter(employee => {
      return employee.toLowerCase().includes(search.toLowerCase())
    })
  }

}
