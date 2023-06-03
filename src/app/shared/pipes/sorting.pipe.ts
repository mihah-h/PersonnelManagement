import { Pipe, PipeTransform } from '@angular/core';
import {Employee} from "../interfaces/employeeInterfaces/employee";
import {Params} from "@angular/router";

@Pipe({
  name: 'sortingEmployees'
})
export class SortingPipe implements PipeTransform {

  transform(employees: Employee[], param: string): Employee[] {

    if (!param) {
      return employees
    }

    if (param === 'alphabet') {
      return employees.sort(function (employee1, employee2) {
        const textA = employee1.surname.toUpperCase();
        const textB = employee2.surname.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
    if (param === 'salaryAscending') {
      return employees.sort((employee1, employee2) =>
        parseFloat(employee1.salary) - parseFloat(employee2.salary))
    }
    if (param === 'salaryDescending') {
      return employees.sort((employee1, employee2) =>
        parseFloat(employee2.salary) - parseFloat(employee1.salary))
    }
    if (param === 'experienceAscending') {
      return employees.sort((employee1, employee2) =>
        parseFloat(employee1.experience) - parseFloat(employee2.experience))
    }
    if (param === 'experienceDescending') {
      return employees.sort((employee1, employee2) =>
        parseFloat(employee2.experience) - parseFloat(employee1.experience))
    }
    if (param === 'ageAscending') {
      return employees.sort((employee1, employee2) =>
        parseFloat(employee1.age) - parseFloat(employee2.age))
    }
    if (param === 'ageDescending') {
      return employees.sort((employee1, employee2) =>
        parseFloat(employee2.age) - parseFloat(employee1.age))
    }

    return employees

  }

}
