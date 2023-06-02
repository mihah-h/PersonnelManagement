import { Pipe, PipeTransform } from "@angular/core";
import {Params} from "@angular/router";
import {Employee, PeriodInCompany} from "../interfaces/employee-interfaces";

@Pipe({
  name: 'filtrationEmployees'
})
export class FiltrationEmployeesPipe implements PipeTransform{
  transform(employees: Employee[], params: Params): Employee[] {

    if (!params) {
      return employees
    }

    return employees.filter((employee) => {
      for (let param in params) {
          if (!(this.checkEmployeeParam(employee[param as keyof Employee], param, params[param]))) {
            return false
          }
      }

      return true
    })

  }

  checkEmployeeParam(employeeParamValue: string | string[] | PeriodInCompany[],
                     param: string, paramValues: string): boolean {
    console.log(paramValues.split('-')[0])
    if (param === 'salary' || param === 'age' || param === 'experience') {
      return ((employeeParamValue >= paramValues.split('-')[0]
        && employeeParamValue < paramValues.split('-')[1])
        || (!paramValues.split('-')[1]
          && employeeParamValue >= paramValues.split('-')[0])
        || (!paramValues.split('-')[0]
          && employeeParamValue < paramValues.split('-')[1]))
    }

    for (let paramValue of paramValues.split('-')) {
      if (employeeParamValue === paramValue) {
        return true
      }
    }

    return false
  }

}
