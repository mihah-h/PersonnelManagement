import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { EmployeeService } from "../shared/services/employee.service";
import { Employee } from "../shared/interfaces/employeeInterfaces/employee";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list-employees-page',
  templateUrl: './list-employees-page.component.html',
  styleUrls: ['./list-employees-page.component.css']
})
export class ListEmployeesPageComponent implements OnInit, OnDestroy{

  employees!: Employee[]
  filtrationParameters!: Params
  sortingParameter = 'alphabet'
  searchParameter = ''
  getEmployeesSub!: Subscription
  queryParamsSub!: Subscription

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.getEmployeesSub = this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees)
    this.queryParamsSub = this.route.queryParams.subscribe(queryParams => {
      this.filtrationParameters = queryParams
    })
  }

  ngOnDestroy(): void {
    this.getEmployeesSub.unsubscribe()
    this.queryParamsSub.unsubscribe()
  }

  take($queryParams: Params) {
    this.router.navigate([], { queryParams: $queryParams })

  }
}
