import {Component, Input} from '@angular/core';
import {Employee} from "../../interfaces/employee-interfaces";

@Component({
  selector: 'app-employee-list-item',
  templateUrl: './employee-list-item.component.html',
  styleUrls: ['../../../list-employees-page/list-employees-page.component.css']
})
export class EmployeeListItemComponent {

  @Input()
  employee!: Employee


}
