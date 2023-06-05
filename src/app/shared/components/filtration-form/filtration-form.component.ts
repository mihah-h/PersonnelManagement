import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {EmployeesInformation} from "../../interfaces/employeeInterfaces/employeesInformation";
import {OptionsGroup} from "../../interfaces/employeeInterfaces/optionsGroup";
import {Observable} from "rxjs";
import {Params} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-filtration-form',
  templateUrl: './filtration-form.component.html',
  styleUrls: ['../../../list-employees-page/list-employees-page.component.css']
})
export class FiltrationFormComponent implements OnInit{

  filters!: []
  filtrationForm!: FormGroup
  optionsGroups!: OptionsGroup[]

  @Output()
  filteringParametersAreSetEvent = new EventEmitter();

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.filtrationForm = new FormGroup({
      status: new FormGroup({
        work: new FormControl(false),
        vacation: new FormControl(false),
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


    this.employeeService.getOptionsGroup().subscribe(optionsGroups => {
      this.optionsGroups = optionsGroups
      console.log(optionsGroups)
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
    console.log(this.filtrationForm)
    this.filteringParametersAreSetEvent.emit(queryParams)
  }

  reset() {
    this.filteringParametersAreSetEvent.emit()
  }
}
