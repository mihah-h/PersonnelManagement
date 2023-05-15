import {Injectable} from "@angular/core";
import {Employee, EmployeesInformation, PeriodInCompany} from "../interfaces/employee-interfaces";
import {Observable} from "rxjs";

@Injectable()
export class EmployeeService {

  getEmployeesInformation(): Observable<EmployeesInformation> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          employees: [{
            photo: '',
            name: 'Vova',
            surname: 'S',
            patronymic: 'R',
            phoneNumber: '567',
            email: 'a@gmail.com',
            status: 'vork',
            project: 'abanking',
            position: 'midl',
            salary: '120000',
            gender: 'men',
            education: 'no',
            birthDate: '10.10.1999',
            interviewDate: '11.12.2021',
            employmentDate: '12.12.2021',
            firstWorkingDayDate: '13.12.2021',
            vacations: ['10.10.2022-9.11.2022', '10.03.2022-9.04.2022'],
            historyInCompany: [{project: 'abanking', position: 'junior', salary: '56000', date: '10.10.2021'}, {project: 'abanking', position: 'midl', salary: '120000', date: '07.06.2022'}]}
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
}
