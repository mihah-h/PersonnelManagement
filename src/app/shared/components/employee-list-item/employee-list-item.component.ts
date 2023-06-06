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
    if (this.deleteEmployeeSub) {
      this.deleteEmployeeSub.unsubscribe()
    }
  }

  goEmployeePage() {
    this.router.navigate(['/admin', 'employee', this.employee.email])
  }

  delete() {
    this.deleteEmployeeSub = this.employeeService.deleteEmployee(this.employee.email).subscribe()
  }

  checkingSuccessEmployees() {
    if (!this.employee.historyInCompany[this.employee.historyInCompany.length - 2]) {
      return 'well'
    }

    if (this.findDifferenceMonths(this.createDate(this.employee.historyInCompany[this.employee.historyInCompany.length - 1].date),
      this.createDate(this.employee.historyInCompany[this.employee.historyInCompany.length - 2].date)) < 6) {
      return 'well'
    }

    if (this.findDifferenceMonths(this.createDate(this.employee.historyInCompany[this.employee.historyInCompany.length - 1].date),
      this.createDate(this.employee.historyInCompany[this.employee.historyInCompany.length - 2].date)) < 12) {
      return 'medium'
    }

    return 'badly'
  }

  createDate(strDate: string) {
    const year = Number(strDate.substring(0, 5))
    const mount = Number(strDate.substring(6, 7))
    const day = Number(strDate.substring(8, 9))

    return new Date(year, mount, day)
  }

  findDifferenceMonths(firstDate: Date , secondDate: Date) {
    return secondDate.getMonth() - firstDate.getMonth() +
      (12 * (secondDate.getFullYear() - firstDate.getFullYear()))
  }
}
