import { Pipe, PipeTransform } from '@angular/core';
import {Employee} from "../interfaces/employee-interfaces";
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
      return employees.sort(function (employee1, employee2) {
        const textA = employee1.salary
        const textB = employee2.salary
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
    if (param === 'salaryDescending') {
      return employees.sort(function (employee1, employee2) {
        const textA = employee1.salary
        const textB = employee2.salary
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
      })
    }
    if (param === 'experienceAscending') {
      return employees.sort(function (employee1, employee2) {
        const textA = employee1.experience
        const textB = employee2.experience
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
    if (param === 'experienceDescending') {
      return employees.sort(function (employee1, employee2) {
        const textA = employee1.experience
        const textB = employee2.experience
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
      })
    }
    if (param === 'ageAscending') {
      return employees.sort(function (employee1, employee2) {
        const textA = employee1.age
        const textB = employee2.age
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
    if (param === 'ageDescending') {
      return employees.sort(function (employee1, employee2) {
        const textA = employee1.age
        const textB = employee2.age
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
      })
    }

    return employees

  }

}
