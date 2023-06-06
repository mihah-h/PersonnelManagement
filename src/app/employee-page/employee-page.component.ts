import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Employee } from "../shared/interfaces/employeeInterfaces/employee";
import { Observable, Subscription, switchMap } from "rxjs";
import { EmployeeService } from "../shared/services/employee.service";
import { PopupWindowFirstComponent } from "../shared/components/popup-window-first/popup-window-first.component";
import { PopupWindowSecondComponent } from "../shared/components/popup-window-second/popup-window-second.component";

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent implements OnInit, OnDestroy{

  employee$!: Observable<Employee>
  employee!: Employee
  employeeSub!: Subscription
  closePopupWindow1Sub!: Subscription
  closePopupWindow2Sub!: Subscription

  @ViewChild('popupContainer', { read: ViewContainerRef })
  private popupContainer: ViewContainerRef

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

    this.employeeSub = this.employee$.subscribe(response => this.employee = response)
  }

  ngOnDestroy(): void {
    this.employeeSub.unsubscribe()
    if (this.closePopupWindow1Sub) {
      this.closePopupWindow1Sub.unsubscribe()
    }
    if (this.closePopupWindow2Sub) {
      this.closePopupWindow2Sub.unsubscribe()
    }
  }

  showFirstPopupWindow() {
    this.popupContainer.clear()
    const component = this.popupContainer.createComponent(PopupWindowFirstComponent)
    component.instance.employee = this.employee
    this.closePopupWindow1Sub = component.instance.closePopupWindow.subscribe(() => this.popupContainer.clear())
  }

  showSecondPopupWindow() {
    this.popupContainer.clear()
    const component = this.popupContainer.createComponent(PopupWindowSecondComponent)
    component.instance.employee = this.employee
    this.closePopupWindow2Sub = component.instance.closePopupWindow.subscribe(() => this.popupContainer.clear())
  }

}
