import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { EmployeeService } from "../shared/services/employee.service";
import { Employee } from "../shared/interfaces/employeeInterfaces/employee";
import { Subscription } from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {
  AddCompanyHistoryPopupWindowComponent
} from "../shared/components/add-company-history-popup-window/add-company-history-popup-window.component";

@Component({
  selector: 'app-list-employees-page',
  templateUrl: './list-employees-page.component.html',
  styleUrls: ['./list-employees-page.component.css']
})
export class ListEmployeesPageComponent implements OnInit, OnDestroy {

  loader = true;
  totalCount = 3;

  employees!: Employee[]
  filtrationParameters!: Params
  sortingParameter = 'alphabet'
  searchParameter = ''
  getEmployeesSub!: Subscription
  queryParamsSub!: Subscription
  deleteEmployeeSub!: Subscription
  addCompanyHistoryPopupWindowComponent!: Subscription
  setDismissedStatusSub!: Subscription
  restoreEmployeeSub!: Subscription

  @ViewChild('popupContainer', { read: ViewContainerRef })
  private popupContainer: ViewContainerRef

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private employeeService: EmployeeService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.getEmployeesSub = this.employeeService.getEmployees()
      .subscribe(employees => setTimeout(() => this.employees = employees, 2500))
    this.queryParamsSub = this.route.queryParams.subscribe(queryParams => {
      this.filtrationParameters = queryParams
    })
  }

  ngOnDestroy(): void {
    this.getEmployeesSub.unsubscribe()
    this.queryParamsSub.unsubscribe()
    if (this.deleteEmployeeSub) {
      this.deleteEmployeeSub.unsubscribe()
    }
  }

  take($queryParams: Params) {
    this.router.navigate([], { queryParams: $queryParams })

  }

  deleteEmployee(employee: Employee) {
    this.deleteEmployeeSub = this.employeeService.deleteEmployee(employee.email).subscribe()
    this.employees.splice(this.employees.indexOf(employee), 1)
  }

  showAddCompanyHistoryPopupWindow(employee: Employee) {
    this.popupContainer.clear()
    const component = this.popupContainer.createComponent(AddCompanyHistoryPopupWindowComponent)
    component.instance.employee = employee
    this.addCompanyHistoryPopupWindowComponent = component.instance.closePopupWindow.subscribe(() => this.popupContainer.clear())
  }

  setDismissedStatus(employee: Employee) {
    employee.status = 'dismissed'
    this.setDismissedStatusSub = this.employeeService.putEmployee(employee).subscribe()
  }

  restoreEmployee(employee: Employee) {
    employee.status = 'work'
    this.restoreEmployeeSub = this.employeeService.putEmployee(employee).subscribe()
  }
}
