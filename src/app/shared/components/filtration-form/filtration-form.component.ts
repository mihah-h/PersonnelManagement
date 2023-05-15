import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeesInformation, OptionsGroup} from "../../interfaces/employee-interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-filtration-form',
  templateUrl: './filtration-form.component.html',
  styleUrls: ['../../../list-employees-page/list-employees-page.component.css']
})
export class FiltrationFormComponent implements OnInit{

  filters!: []
  filtrationForm!: FormGroup
  options!: OptionsGroup[]

  @Input()
  employeesInformation$!: Observable<EmployeesInformation>

  @Output()
  newItemEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
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
      this.options = employeesInformation.options

      for (let r of this.options) {
        this.filtrationForm.addControl(r.optionsGroupName, new FormGroup({}))
        const optionsGroupName = this.filtrationForm.controls[r.optionsGroupName] as FormGroup
        for (let i of r.options) {
          optionsGroupName.addControl(i, new FormControl(false))
        }
      }

    })
  }



  apply() {

    this.newItemEvent.emit(this.filtrationForm.value)
  }
}
