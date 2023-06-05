import { Injectable } from "@angular/core";
import {EmployeesInformation} from "../interfaces/employeeInterfaces/employeesInformation";
import { Observable } from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Employee} from "../interfaces/employeeInterfaces/employee";
import {AuthService} from "./auth.service";
import {OptionsGroup} from "../interfaces/employeeInterfaces/optionsGroup";

@Injectable()
export class EmployeeService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>('http://localhost:3000/employees?company='
      + this.auth.userCompanyName)
  }

  addEmployee(newEmployee: Employee): Observable<string> {
    return this.http.post('http://localhost:3000/employees?company='
      + this.auth.userCompanyName, newEmployee, {responseType: "text"})
  }

  getEmployee(employeeEmail: string): Observable<Employee> {
    return this.http.get<Employee>('http://localhost:3000/employees?company='
      + this.auth.userCompanyName + '&email=' + employeeEmail)
  }

  getOptionsGroup(): Observable<OptionsGroup[]> {
    return this.http.get<OptionsGroup[]>('http://localhost:3000/optionsGroups?company='
      + this.auth.userCompanyName)
  }

  addNewOption(optionsGroupName: string, newOption: string): Observable<string> {
    return this.http.post('http://localhost:3000/optionsGroups?company='
      + this.auth.userCompanyName + '&optionsGroupName=' + optionsGroupName + '&option=' + newOption, "", {responseType: "text"})
  }

  putEmployee(employee: Employee): Observable<string> {
    return this.http.put('http://localhost:3000/employees?company=' + this.auth.userCompanyName, employee, {responseType: "text"})
  }

  deleteEmployee(employee: Employee): Observable<Employee> {
    return this.http.delete<Employee>('http://localhost:3000/optionsGroups?company=ArtSofte'
      + this.auth.userCompanyName + '&email=' + employee.email)
  }
}
