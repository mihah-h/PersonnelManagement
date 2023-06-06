import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { OptionsGroup } from "../../interfaces/employeeInterfaces/optionsGroup";
import { Params } from "@angular/router";
import { EmployeeService } from "../../services/employee.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-filtration-form',
  templateUrl: './filtration-form.component.html',
  styleUrls: ['../../../list-employees-page/list-employees-page.component.css']
})
export class FiltrationFormComponent implements OnInit, OnDestroy{

  filtrationForm!: FormGroup
  optionsGroups!: OptionsGroup[]
  getOptionsGroupSub!: Subscription

  @Output()
  filteringParametersAreSetEvent = new EventEmitter();

  constructor(
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.filtrationForm = new FormGroup({
      status: new FormGroup({
        work: new FormControl(false),
        dismissed: new FormControl(false)
      }),
      salary: new FormGroup({
        from: new FormControl(null),
        to: new FormControl(null),
      }),
      experience: new FormGroup({
        from: new FormControl(null),
        to: new FormControl(null),
      }),
      gender: new FormGroup({
        man: new FormControl(null),
        woman: new FormControl(null),
      }),
      age: new FormGroup({
        from: new FormControl(null),
        to: new FormControl(null),
      })
    })


    this.getOptionsGroupSub =  this.employeeService.getOptionsGroup().subscribe(optionsGroups => {
      this.optionsGroups = optionsGroups
      for (const optionGroup of this.optionsGroups) {
        this.filtrationForm.addControl(optionGroup.optionsGroupName, new FormGroup({}))
        const optionsGroupName = this.filtrationForm.controls[optionGroup.optionsGroupName] as FormGroup
        for (const option of optionGroup.options) {
          optionsGroupName.addControl(option, new FormControl(false))
        }
      }
      console.log(this.filtrationForm)
    })
  }

  ngOnDestroy(): void {
    this.getOptionsGroupSub.unsubscribe()
  }

  apply() {
    const queryParams: Params = {}
    for (const param in this.filtrationForm.value) {
      let queryParamValue: string
      for (const paramValue in this.filtrationForm.value[param]) {
        queryParamValue = typeof(this.filtrationForm.value[param][paramValue]) === "number" ?
          this.filtrationForm.value[param][paramValue] : paramValue
        if (this.filtrationForm.value[param][paramValue]) {
          queryParams[param as keyof Params] = param in queryParams ?
            [queryParams[param as keyof Params], queryParamValue].join('-') : queryParamValue
        }
      }
    }
    this.filteringParametersAreSetEvent.emit(queryParams)
  }

  reset() {
    this.filteringParametersAreSetEvent.emit()
  }
}
