import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {EmployeeService} from "../shared/services/employee.service";
import {OptionsGroup} from "../shared/interfaces/employeeInterfaces/optionsGroup";

@Component({
  selector: 'app-adding-employee-page',
  templateUrl: './adding-employee-page.component.html',
  styleUrls: ['./adding-employee-page.component.css']
})
export class AddingEmployeePageComponent implements OnInit{

  newEmployeeForm!: FormGroup
  optionsGroup!: OptionsGroup[]

  constructor(private employees: EmployeeService, private router: Router) {
  }

  ngOnInit(): void {
    this.employees.getEmployeesInformation().
    subscribe(employeesInformation => this.optionsGroup = employeesInformation.options)

    this.newEmployeeForm = new FormGroup({
      photo: new FormControl(''),
      name: new FormControl(''),
      surname: new FormControl(''),
      lastname: new FormControl(''),
      gender: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      project: new FormControl(''),
      status: new FormControl(''),
      salary: new FormControl(''),
      education: new FormControl(''),
      dateOfBirth: new FormControl(''),
      dateOfInterview: new FormControl(''),
      dateOfEmployment: new FormControl(''),
      dateOfThirstWorkingDay: new FormControl(''),

    })
  }

  addEmployee() {
    this.router.navigate(['/admin', 'employee-added'])


  }
}
