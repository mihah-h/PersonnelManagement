export interface UserLogin {
  email: string
  password: string
}

export interface AdminRegistration {
  companyName: string
  email: string
  password: string
}

export interface UserLoginResponse {
  token: string
}
