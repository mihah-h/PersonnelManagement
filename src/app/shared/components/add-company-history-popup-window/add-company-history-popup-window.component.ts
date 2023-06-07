import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Employee} from "../../interfaces/employeeInterfaces/employee";
import {EmployeeService} from "../../services/employee.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {OptionsGroup} from "../../interfaces/employeeInterfaces/optionsGroup";

@Component({
  selector: 'app-add-company-history-popup-window',
  templateUrl: './add-company-history-popup-window.component.html',
  styleUrls: ['./add-company-history-popup-window.component.css']
})
export class AddCompanyHistoryPopupWindowComponent {

  companyHistoryEditingForm!: FormGroup
  optionsGroups: OptionsGroup[]
  getOptionsGroupSub!: Subscription
  putEmployeeSub!: Subscription

  @Input()
  employee!: Employee
  @Output()
  closePopupWindow = new EventEmitter<void>()

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.companyHistoryEditingForm = new FormGroup({
      project: new FormControl(
        this.employee.historyInCompany[this.employee.historyInCompany.length - 1].project, [
        Validators.required
      ]),
      position: new FormControl(
        this.employee.historyInCompany[this.employee.historyInCompany.length - 1].position, [
        Validators.required
      ]),
      salary:  new FormControl(
        this.employee.historyInCompany[this.employee.historyInCompany.length - 1].salary, [
        Validators.required
      ]),
      date:  new FormControl(
        this.employee.historyInCompany[this.employee.historyInCompany.length - 1].date, [
        Validators.required
      ])
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
    this.addCompanyHistory()
    this.putEmployeeSub = this.employeeService.putEmployee(this.employee).subscribe(() => this.closePopupWindow.next())

    if (this.companyHistoryEditingForm.value.education
      && !this.optionsGroups[0].options.includes(this.companyHistoryEditingForm.value.education)) {
      this.employeeService.addNewOption('project', this.companyHistoryEditingForm.value.education).subscribe()
    }

    if (this.companyHistoryEditingForm.value.education
      && !this.optionsGroups[1].options.includes(this.companyHistoryEditingForm.value.education)) {
      this.employeeService.addNewOption('position', this.companyHistoryEditingForm.value.education).subscribe()
    }
  }

  addCompanyHistory() {
    this.employee.historyInCompany.push({
      project: this.companyHistoryEditingForm.value.project,
      position: this.companyHistoryEditingForm.value.position,
      salary: this.companyHistoryEditingForm.value.salary,
      date: this.companyHistoryEditingForm.value.date
    })

  }
}
