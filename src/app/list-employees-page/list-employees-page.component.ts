import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {EmployeeService} from "../shared/services/employee.service";
import {Employee, EmployeesInformation} from "../shared/interfaces/employee-interfaces";

@Component({
  selector: 'app-list-employees-page',
  templateUrl: './list-employees-page.component.html',
  styleUrls: ['./list-employees-page.component.css']
})
export class ListEmployeesPageComponent implements OnInit{

  employeesInformationSub!: Subscription
  employees!: Employee[]
  employeesInformation$!: Observable<EmployeesInformation>
  params!: Params

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employeesInformation$ = this.employeeService.getEmployeesInformation()
    console.log(this.employeeService.get())
    this.employeesInformationSub = this.employeesInformation$.subscribe(employeesInformation => {
      this.employees = employeesInformation.employees
    })

    this.route.queryParams.subscribe(queryParams => {
      this.params = queryParams
    })


  }

  take($queryParams: Params) {
    this.router.navigate([], { queryParams: $queryParams })

  }


}
