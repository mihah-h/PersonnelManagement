import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import {UserLogin} from "../interfaces/auth-interfaces/userLogin";
import {UserLoginResponse} from "../interfaces/auth-interfaces/userLoginResponse";
import {UserRegistration} from "../interfaces/auth-interfaces/userRegistration";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  get userCompanyName(): string | null {
    return localStorage.getItem('companyName')
  }

  // login(userEmail: string): Observable<UserLogin | null> {
  //   return this.http.get<UserLogin>('http://localhost:3000/users?email=' + userEmail)
  //     .pipe(
  //       tap(this.setUserCompanyName)
  //     )
  // }

  login(userEmail: string, userPassword: string): Observable<UserLogin | null> {
    return this.http.post<UserLogin>('http://localhost:3000/users/auth', {"email":userEmail, "password":userPassword})
      .pipe(
        tap(this.setUserCompanyName)
      )
  }

  register(user: UserRegistration): Observable<string> {
    return this.http.post('http://localhost:3000/users/register', user, { responseType: "text"});
  }

  logout() {
    this.setUserCompanyName(null)
  }

  isAuthenticated(): boolean {
    return !!this.userCompanyName
  }

  private setUserCompanyName(response: UserLogin | null) {
    if (response) {
      localStorage.setItem('companyName', response.companyName)
    } else {
      localStorage.clear()
    }
  }
}
