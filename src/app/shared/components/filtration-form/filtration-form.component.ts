import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeesInformation, OptionsGroup} from "../../interfaces/employee-interfaces";
import {Observable} from "rxjs";
import {Params} from "@angular/router";

@Component({
  selector: 'app-filtration-form',
  templateUrl: './filtration-form.component.html',
  styleUrls: ['../../../list-employees-page/list-employees-page.component.css']
})
export class FiltrationFormComponent implements OnInit{

  filters!: []
  filtrationForm!: FormGroup
  optionsGroups!: OptionsGroup[]

  @Input()
  employeesInformation$!: Observable<EmployeesInformation>

  @Output()
  filteringParametersAreSetEvent = new EventEmitter();

  constructor() {
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

    this.employeesInformation$.subscribe(employeesInformation => {
      this.optionsGroups = employeesInformation.options

      for (let optionGroup of this.optionsGroups) {
        this.filtrationForm.addControl(optionGroup.optionsGroupName, new FormGroup({}))
        const optionsGroupName = this.filtrationForm.controls[optionGroup.optionsGroupName] as FormGroup
        for (let option of optionGroup.options) {
          optionsGroupName.addControl(option, new FormControl(false))
        }
        console.log(this.filtrationForm.value)
      }
    })
  }



  apply() {
    const queryParams: Params = {}
    for (let param in this.filtrationForm.value) {
      let queryParamValue: string
      for (let paramValue in this.filtrationForm.value[param]) {
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
}
