import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Employee} from "../../interfaces/employeeInterfaces/employee";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OptionsGroup} from "../../interfaces/employeeInterfaces/optionsGroup";
import {Subscription} from "rxjs";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-refactor-company-history-popup-window',
  templateUrl: './refactor-company-history-popup-window.component.html',
  styleUrls: ['./refactor-company-history-popup-window.component.css']
})
export class RefactorCompanyHistoryPopupWindowComponent implements OnInit, OnDestroy{

  refactorCompanyHistoryForm!: FormGroup
  optionsGroups!: OptionsGroup[]
  getOptionsGroupSub!: Subscription
  putEmployeeSub!: Subscription

  @Input()
  employee!: Employee
  @Input()
  historyInCompanyIndex!: number
  @Output()
  closePopupWindow = new EventEmitter<void>()

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.refactorCompanyHistoryForm = new FormGroup({
      project: new FormControl(
        this.employee.historyInCompany[this.historyInCompanyIndex].project, [
          Validators.required
        ]),
      position: new FormControl(
        this.employee.historyInCompany[this.historyInCompanyIndex].position, [
          Validators.required
        ]),
      salary:  new FormControl(
        this.employee.historyInCompany[this.historyInCompanyIndex].salary, [
          Validators.required
        ]),
      date:  new FormControl(
        this.employee.historyInCompany[this.historyInCompanyIndex].date, [
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
    this.refactorCompanyHistory()
    this.putEmployeeSub = this.employeeService.putEmployee(this.employee).subscribe(() => this.closePopupWindow.next())

    if (this.refactorCompanyHistoryForm.value.education
      && !this.optionsGroups[0].options.includes(this.refactorCompanyHistoryForm.value.education)) {
      this.employeeService.addNewOption('project', this.refactorCompanyHistoryForm.value.education).subscribe()
    }

    if (this.refactorCompanyHistoryForm.value.education
      && !this.optionsGroups[1].options.includes(this.refactorCompanyHistoryForm.value.education)) {
      this.employeeService.addNewOption('position', this.refactorCompanyHistoryForm.value.education).subscribe()
    }
  }

  delete() {
    if (this.employee.historyInCompany.length > 1) {
      this.deleteCompanyHistory()
      this.putEmployeeSub = this.employeeService.putEmployee(this.employee).subscribe(() => this.closePopupWindow.next())
    }
  }

  refactorCompanyHistory() {
    this.employee.historyInCompany[this.historyInCompanyIndex] = {
      project: this.refactorCompanyHistoryForm.value.project,
      position: this.refactorCompanyHistoryForm.value.position,
      salary: this.refactorCompanyHistoryForm.value.salary,
      date: this.refactorCompanyHistoryForm.value.date
    }
    if (this.employee.historyInCompany[this.employee.historyInCompany.length - 1]
      === this.employee.historyInCompany[this.historyInCompanyIndex]) {
      this.employee.project = this.refactorCompanyHistoryForm.value.project
      this.employee.position = this.refactorCompanyHistoryForm.value.position
      this.employee.salary = this.refactorCompanyHistoryForm.value.salary
    }
  }

  deleteCompanyHistory() {
    this.employee.historyInCompany.splice(this.historyInCompanyIndex, 1)
  }
}
