import {Inject, Injectable} from "@angular/core";
import {EmployeesInformation} from "../interfaces/employeeInterfaces/employeesInformation";
import { Observable } from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Employee} from "../interfaces/employeeInterfaces/employee";
import {AuthService} from "./auth.service";
import {OptionsGroup} from "../interfaces/employeeInterfaces/optionsGroup";
import {API_URL} from "../provider";

@Injectable()
export class EmployeeService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    @Inject(API_URL) private apiURL: string
  ) {}

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiURL + '/employees?company='
      + this.auth.userCompanyName)
  }

  addEmployee(newEmployee: Employee): Observable<string> {
    return this.http.post(this.apiURL + '/employees?company='
      + this.auth.userCompanyName, newEmployee, {responseType: "text"})
  }

  getEmployee(employeeEmail: string): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/employees?company='
      + this.auth.userCompanyName + '&email=' + employeeEmail)
  }

  getOptionsGroup(): Observable<OptionsGroup[]> {
    return this.http.get<OptionsGroup[]>(this.apiURL + '/optionsGroups?company='
      + this.auth.userCompanyName)
  }

  addNewOption(optionsGroupName: string, newOption: string): Observable<string> {
    return this.http.post(this.apiURL + '/optionsGroups?company='
      + this.auth.userCompanyName + '&optionsGroupName='
      + optionsGroupName + '&option=' + newOption, "", {responseType: "text"})
  }

  putEmployee(employee: Employee): Observable<string> {
    return this.http.put(this.apiURL + '/employees?company='
      + this.auth.userCompanyName, employee, {responseType: "text"})
  }

  deleteEmployee(employeeEmail: string): Observable<string>  {
    return this.http.delete(this.apiURL + '/employees?company='
      + this.auth.userCompanyName + '&email=' + employeeEmail, {responseType: "text"})
  }
}
