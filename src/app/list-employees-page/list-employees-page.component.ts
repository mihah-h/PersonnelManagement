import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {EmployeeService} from "../shared/services/employee.service";
import {Employee} from "../shared/interfaces/employeeInterfaces/employee";
import {EmployeesInformation} from "../shared/interfaces/employeeInterfaces/employeesInformation";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-employees-page',
  templateUrl: './list-employees-page.component.html',
  styleUrls: ['./list-employees-page.component.css']
})
export class ListEmployeesPageComponent implements OnInit{

  employeesInformationSub!: Subscription
  employees!: Employee[]
  employeesInformation$!: Observable<EmployeesInformation>
  filtrationParameters!: Params
  sortingParameter: string = 'alphabet'
  searchParameter: string = ''

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employeesInformation$ = this.employeeService.getEmployeesInformation()
    this.employeesInformationSub = this.employeesInformation$.subscribe(employeesInformation => {
      this.employees = employeesInformation.employees
    })

    this.route.queryParams.subscribe(queryParams => {
      this.filtrationParameters = queryParams
    })

  }

  take($queryParams: Params) {
    this.router.navigate([], { queryParams: $queryParams })

  }

  takeSort($queryParams: Params) {
    this.router.navigate([], { queryParams: $queryParams })

  }


}
