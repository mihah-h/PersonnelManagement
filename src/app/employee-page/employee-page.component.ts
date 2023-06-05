import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Employee} from "../shared/interfaces/employeeInterfaces/employee";
import {Observable, switchMap} from "rxjs";
import {EmployeeService} from "../shared/services/employee.service";

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent implements OnInit{

  employeeInformation!: Employee
  employee$!: Observable<Employee>

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employee$ = this.route.params
      .pipe(switchMap((params: Params) => {
        const employeeEmail = params['id']
        return this.employeeService.getEmployee(employeeEmail)
      }))
    // this.employeeInformation = this.route.params
    //   .pipe(switchMap((params: Params) => {
    //     return this.employee.getEmployeesInformation()
    //   }))
  }
}
