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
  ) {
  }
  getEmployeesInformation(): Observable<EmployeesInformation> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          employees: [{
            photo: '',
            name: 'Владимир',
            surname: 'Ефремов ',
            patronymic: 'Евгеньевич',
            phoneNumber: '567',
            email: 'a@gmail.com',
            status: 'work',
            project: 'abanking',
            position: 'midl',
            salary: '120000',
            gender: 'man',
            education: 'no',
            birthDate: '10.10.1999',
            age: '24',
            interviewDate: '11.12.2021',
            employmentDate: '12.12.2021',
            experience: '2',
            firstWorkingDayDate: '13.12.2021',
            vacations: ['10.10.2022-9.11.2022', '10.03.2022-9.04.2022'],
            historyInCompany: [{ project: 'abanking', position: 'junior', salary: '56000', date: '10.10.2021' },
            { project: 'abanking', position: 'midl', salary: '120000', date: '07.06.2022' }]
          },

          {
            photo: '',
            name: 'Викория',
            surname: 'Иванова',
            patronymic: 'Сергеевна',
            phoneNumber: '564654',
            email: 'gg@gmail.com',
            status: 'work',
            project: 'paper',
            position: 'midl',
            salary: '160000',
            gender: 'woman',
            education: 'courses',
            birthDate: '06.16.1996',
            age: '27',
            interviewDate: '11.12.2022',
            employmentDate: '13.12.2021',
            experience: '2',
            firstWorkingDayDate: '13.12.2020',
            vacations: ['10.10.2022-9.11.2022', '10.03.2022-9.04.2022'],
            historyInCompany: [{ project: 'abanking', position: 'junior', salary: '56000', date: '10.10.2021' },
            { project: 'paper', position: 'midl', salary: '160000', date: '07.06.2022' }]
          },
          {
            photo: '',
            name: 'Семен',
            surname: 'Кученев',
            patronymic: 'Анатольевич',
            phoneNumber: '564654',
            email: 'gg@gmail.com',
            status: 'work',
            project: 'paper',
            position: 'junior',
            salary: '50000',
            gender: 'man',
            education: 'courses',
            birthDate: '06.16.2002',
            age: '21',
            interviewDate: '11.12.2019',
            employmentDate: '13.12.2019',
            experience: '2',
            firstWorkingDayDate: '13.12.2020',
            vacations: ['10.10.2022-9.11.2022', '10.03.2022-9.04.2022'],
            historyInCompany: [{ project: 'abanking', position: 'junior', salary: '56000', date: '10.10.2021' },
              { project: 'paper', position: 'midl', salary: '160000', date: '07.06.2022' }]
          },
          {
            photo: '',
            name: 'Павел',
            surname: 'Сидоров',
            patronymic: 'Дмитриевич',
            phoneNumber: '564654',
            email: 'gg@gmail.com',
            status: 'work',
            project: 'paper',
            position: 'junior',
            salary: '200000',
            gender: 'man',
            education: 'courses',
            birthDate: '06.16.1980',
            age: '43',
            interviewDate: '11.12.2019',
            employmentDate: '13.12.2019',
            experience: '2',
            firstWorkingDayDate: '13.12.2020',
            vacations: ['10.10.2022-9.11.2022', '10.03.2022-9.04.2022'],
            historyInCompany: [{ project: 'abanking', position: 'junior', salary: '56000', date: '10.10.2021' },
              { project: 'paper', position: 'midl', salary: '160000', date: '07.06.2022' }]
          }
          ],
          options: [
            {
              optionsGroupNameRu: 'Проект',
              optionsGroupName: 'project',
              options: ['abanking', 'paper']
            },
            {
              optionsGroupNameRu: 'Должность',
              optionsGroupName: 'position',
              options: ['junior', 'midl']
            },
            {
              optionsGroupNameRu: 'Образование',
              optionsGroupName: 'education',
              options: ['no', 'courses']
            },

          ]
        })
      }, 1000)
    })
  }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>('http://localhost:3000/employees?company=' + this.auth.userCompanyName)
  }

  addEmployee(newEmployee: Employee) {
    return this.http.post('http://localhost:3000/employees?company=' + this.auth.userCompanyName, newEmployee)
  }

  getEmployee(employeeEmail: string): Observable<Employee> {
    return this.http.get<Employee>('http://localhost:3000/employees?company=' + this.auth.userCompanyName + '&email=' + employeeEmail)
  }

  getOptionsGroup(): Observable<OptionsGroup[]> {
    return this.http.get<OptionsGroup[]>('http://localhost:3000/optionsGroups?company=' + this.auth.userCompanyName)
  }
}
