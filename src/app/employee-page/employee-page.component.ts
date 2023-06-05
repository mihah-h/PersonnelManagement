import {Component, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Employee} from "../shared/interfaces/employeeInterfaces/employee";
import {Observable, switchMap} from "rxjs";
import {EmployeeService} from "../shared/services/employee.service";
import {ErrorMessageDynamicComponent} from "../shared/components/error-message-dynamic/error-message-dynamic.component";
import {PopupWindowFirstComponent} from "../shared/components/popup-window-first/popup-window-first.component";

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent implements OnInit{

  employee$!: Observable<Employee>
  employee!: Employee

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

    this.employee$.subscribe(response => this.employee = response)
  }

  showPopupWindow() {
    this.popupContainer.clear()
    const component = this.popupContainer.createComponent(PopupWindowFirstComponent)
    component.instance.employee = this.employee
    component.instance.closePopupWindow.subscribe(() => this.popupContainer.clear())
  }
}
