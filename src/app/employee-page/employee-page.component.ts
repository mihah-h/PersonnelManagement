import { Component } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Employee} from "../shared/interfaces/employeeInterfaces/employee";
import {switchMap} from "rxjs";
import {EmployeeService} from "../shared/services/employee.service";

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent {

  employeeInformation!: Employee

  constructor(
    private route: ActivatedRoute,
    private employee: EmployeeService
  ) {}

  ngOnInit() {
    // this.employeeInformation = this.route.params
    //   .pipe(switchMap((params: Params) => {
    //     return this.employee.getEmployeesInformation()
    //   }))
  }
}
