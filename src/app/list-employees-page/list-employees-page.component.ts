import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employeesInformation$ = this.employeeService.getEmployeesInformation()
    this.employeesInformationSub = this.employeesInformation$.subscribe(employeesInformation => {
      this.employees = employeesInformation.employees
    })

    this.route.queryParams.subscribe(queryParams => {
      console.log(queryParams)
    })
  }

  take($event: Object) {
    this.router.navigate([], { queryParams: $event })
    // for (let param in $event) {
    //   console.log($event[param])
    // }

  }


}
