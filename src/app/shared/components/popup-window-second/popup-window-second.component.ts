import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../interfaces/employeeInterfaces/employee";
import {EmployeeService} from "../../services/employee.service";
import {OptionsGroup} from "../../interfaces/employeeInterfaces/optionsGroup";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-popup-window-second',
  templateUrl: './popup-window-second.component.html',
  styleUrls: ['./popup-window-second.component.css']
})
export class PopupWindowSecondComponent implements OnInit , OnDestroy{

  dataEditingForm!: FormGroup
  optionsGroups!: OptionsGroup[]
  getOptionsGroupSub!: Subscription
  putEmployeeSub!: Subscription

  @Input()
  employee!: Employee
  @Output()
  closePopupWindow = new EventEmitter<void>()

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.dataEditingForm = new FormGroup({
      education: new FormControl(this.employee.education, [
        Validators.required
      ]),
      birthDate: new FormControl(this.employee.birthDate, [
        Validators.required
      ]),
      interviewDate: new FormControl(this.employee.interviewDate, [
        Validators.required
      ]),
      employmentDate: new FormControl(this.employee.employmentDate, [
        Validators.required
      ]),
      firstWorkingDayDate: new FormControl(this.employee.firstWorkingDayDate, [
        Validators.required
      ]),
      newVacationsStart: new FormControl(''),
      newVacationsEnd: new FormControl(''),
    })

    this.getOptionsGroupSub = this.employeeService.getOptionsGroup().
      subscribe(optionsGroups => this.optionsGroups = optionsGroups)
  }

  ngOnDestroy(): void {
    if (this.putEmployeeSub) {
      this.putEmployeeSub.unsubscribe()
    }
    this.getOptionsGroupSub.unsubscribe()
  }

  save() {
    this.changeUserData()
    this.putEmployeeSub = this.employeeService.putEmployee(this.employee).subscribe(() => this.closePopupWindow.next())

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
    if (this.dataEditingForm.value.newVacationsStart || this.dataEditingForm.value.newVacationsEnd) {
      this.employee.vacations.push(this.dataEditingForm.value.newVacationsStart
        + '-' + this.dataEditingForm.value.newVacationsEnd)
    }

  }
}
