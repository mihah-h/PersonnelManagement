import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {EmployeeService} from "../shared/services/employee.service";
import {OptionsGroup} from "../shared/interfaces/employeeInterfaces/optionsGroup";
import {PeriodInCompany} from "../shared/interfaces/employeeInterfaces/periodInCompany";

@Component({
  selector: 'app-adding-employee-page',
  templateUrl: './adding-employee-page.component.html',
  styleUrls: ['./adding-employee-page.component.css']
})
export class AddingEmployeePageComponent implements OnInit{

  newEmployeeForm!: FormGroup
  optionsGroups!: OptionsGroup[]

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit(): void {
    this.employeeService.getOptionsGroup().
    subscribe(optionsGroup => this.optionsGroups = optionsGroup)
    this.newEmployeeForm = new FormGroup({
      photo: new FormControl(''),
      name: new FormControl(''),
      surname: new FormControl(''),
      lastname: new FormControl(''),
      gender: new FormControl('man'),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      project: new FormControl(''),
      position: new FormControl(''),
      salary: new FormControl(''),
      education: new FormControl(''),
      dateOfBirth: new FormControl(''),
      dateOfInterview: new FormControl(''),
      dateOfEmployment: new FormControl(''),
      dateOfThirstWorkingDay: new FormControl(''),

    })
  }

  addEmployee() {
    this.employeeService.addEmployee({
        photo: '',
        name: this.newEmployeeForm.value.name,
        surname: this.newEmployeeForm.value.surname,
        patronymic: this.newEmployeeForm.value.lastname,
        phoneNumber: this.newEmployeeForm.value.phoneNumber,
        email: this.newEmployeeForm.value.email,
        status: 'work',
        project: this.newEmployeeForm.value.project,
        position: this.newEmployeeForm.value.position,
        salary: this.newEmployeeForm.value.salary,
        gender: this.newEmployeeForm.value.gender,
        education: this.newEmployeeForm.value.education,
        birthDate: this.newEmployeeForm.value.dateOfBirth,
        age: '23',
        interviewDate: this.newEmployeeForm.value.dateOfInterview,
        employmentDate: this.newEmployeeForm.value.dateOfEmployment,
        experience: '3',
        firstWorkingDayDate: this.newEmployeeForm.value.dateOfThirstWorkingDay,
        vacations: [],
        historyInCompany: [{
          project: this.newEmployeeForm.value.project,
          position:  this.newEmployeeForm.value.position,
          salary:  this.newEmployeeForm.value.salary,
          date:  this.newEmployeeForm.value.dateOfThirstWorkingDay,
        }],
      }
    ).subscribe()
    if (this.newEmployeeForm.value.project
      && !this.optionsGroups[0].options.includes(this.newEmployeeForm.value.project)) {
      console.log(this.newEmployeeForm.value.project)
      this.employeeService.addNewOption('project', this.newEmployeeForm.value.project).subscribe()
    }
    if (this.newEmployeeForm.value.position
      && !this.optionsGroups[1].options.includes(this.newEmployeeForm.value.position)) {
      this.employeeService.addNewOption('position', this.newEmployeeForm.value.position).subscribe()
    }
    if (this.newEmployeeForm.value.education
      && !this.optionsGroups[2].options.includes(this.newEmployeeForm.value.education)) {
      this.employeeService.addNewOption('education', this.newEmployeeForm.value.education).subscribe()
    }

  }
}
