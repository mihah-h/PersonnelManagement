import {Component, Input} from '@angular/core';
import {Employee} from "../../interfaces/employeeInterfaces/employee";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-list-item',
  templateUrl: './employee-list-item.component.html',
  styleUrls: ['../../../list-employees-page/list-employees-page.component.css']
})
export class EmployeeListItemComponent {

  @Input()
  employee!: Employee

  constructor(private router: Router) {
  }

  goEmployeePage() {
    this.router.navigate(['/admin', 'employee', this.employee.email])
  }
}
