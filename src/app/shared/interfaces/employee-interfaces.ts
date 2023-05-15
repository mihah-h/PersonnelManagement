export interface PeriodInCompany {
  project: string
  position: string
  salary: string
  date: string
}

export interface OptionsGroup{
  optionsGroupNameRu: string
  optionsGroupName: string
  options: string[]
}


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
  interviewDate: string
  employmentDate: string
  firstWorkingDayDate: string
  vacations: string[]
  historyInCompany: PeriodInCompany[]
}

export interface EmployeesInformation {
  employees: Employee[]
  options: OptionsGroup[]
}


