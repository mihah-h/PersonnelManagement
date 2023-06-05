import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Employee} from "../../interfaces/employeeInterfaces/employee";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-popup-window-first',
  templateUrl: './popup-window-first.component.html',
  styleUrls: ['./popup-window-first.component.css']
})
export class PopupWindowFirstComponent implements OnInit{

  dataEditingForm!: FormGroup

  @Input()
  employee!: Employee
  @Output()
  closePopupWindow = new EventEmitter<void>()

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.dataEditingForm = new FormGroup({
      name: new FormControl(this.employee.name),
      surname: new FormControl(this.employee.surname),
      patronymic: new FormControl(this.employee.patronymic),
      phoneNumber: new FormControl(this.employee.phoneNumber),
    })
  }

  save() {
    this.changeUserData()
    this.employeeService.putEmployee(this.employee).subscribe()
  }

  changeUserData() {
    this.employee.name = this.dataEditingForm.value.name
    this.employee.surname = this.dataEditingForm.value.surname
    this.employee.patronymic = this.dataEditingForm.value.patronymic
    this.employee.phoneNumber = this.dataEditingForm.value.phoneNumber
  }
}
