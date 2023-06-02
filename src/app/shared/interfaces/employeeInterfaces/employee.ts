import {PeriodInCompany} from "./periodInCompany";

export interface Employee {
  photo: string
  name: string
  surname: string
  patronymic: string
  phoneNumber: string
  email: string
  status: string
  project: string
  position: string
  salary: string
  gender: string
  education: string
  birthDate: string
  age:string
  interviewDate: string
  employmentDate: string
  experience: string
  firstWorkingDayDate: string
  vacations: string[]
  historyInCompany: PeriodInCompany[]
}
