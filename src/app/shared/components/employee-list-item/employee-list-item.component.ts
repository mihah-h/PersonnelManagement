import {Component, Input, OnDestroy} from '@angular/core';
import {Employee} from "../../interfaces/employeeInterfaces/employee";
import {Router} from "@angular/router";
import { EmployeeService } from '../../services/employee.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-employee-list-item',
  templateUrl: './employee-list-item.component.html',
  styleUrls: ['../../../list-employees-page/list-employees-page.component.css']
})
export class EmployeeListItemComponent implements OnDestroy{

  @Input()
  employee!: Employee
  deleteEmployeeSub!: Subscription

  constructor(private router: Router, private employeeService: EmployeeService) {
  }

  ngOnDestroy(): void {
    this.deleteEmployeeSub.unsubscribe()
  }

  goEmployeePage() {
    this.router.navigate(['/admin', 'employee', this.employee.email])
  }

  delete() {
    this.deleteEmployeeSub = this.employeeService.deleteEmployee(this.employee).subscribe()
  }

}
