import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Employee} from "../../interfaces/employeeInterfaces/employee";
import {EmployeeService} from "../../services/employee.service";
import {OptionsGroup} from "../../interfaces/employeeInterfaces/optionsGroup";

@Component({
  selector: 'app-popup-window-second',
  templateUrl: './popup-window-second.component.html',
  styleUrls: ['./popup-window-second.component.css']
})
export class PopupWindowSecondComponent {

  dataEditingForm!: FormGroup
  optionsGroups!: OptionsGroup[]

  @Input()
  employee!: Employee
  @Output()
  closePopupWindow = new EventEmitter<void>()

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.dataEditingForm = new FormGroup({
      education: new FormControl(this.employee.education),
      birthDate: new FormControl(this.employee.birthDate),
      interviewDate: new FormControl(this.employee.interviewDate),
      employmentDate: new FormControl(this.employee.employmentDate),
      firstWorkingDayDate: new FormControl(this.employee.firstWorkingDayDate),
      newVacationsStart: new FormControl(''),
      newVacationsEnd: new FormControl(''),
    })

    this.employeeService.getOptionsGroup().
    subscribe(optionsGroups => this.optionsGroups = optionsGroups)
  }

  save() {
    this.changeUserData()
    this.employeeService.putEmployee(this.employee).subscribe()

    if (this.dataEditingForm.value.education
      && !this.optionsGroups[2].options.includes(this.dataEditingForm.value.education)) {
      this.employeeService.addNewOption('education', this.dataEditingForm.value.education).subscribe()
    }


  }

  changeUserData() {
    this.employee.education = this.dataEditingForm.value.education
    this.employee.birthDate = this.dataEditingForm.value.birthDate
    this.employee.interviewDate = this.dataEditingForm.value.interviewDate
    this.employee.employmentDate = this.dataEditingForm.value.employmentDate
    this.employee.firstWorkingDayDate = this.dataEditingForm.value.firstWorkingDayDate
    this.employee.vacations.push(this.dataEditingForm.value.newVacationsStart
      + '-' + this.dataEditingForm.value.newVacationsEnd)

  }
}
