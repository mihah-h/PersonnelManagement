import {Inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import {UserLogin} from "../interfaces/auth-interfaces/userLogin";
import {UserLoginResponse} from "../interfaces/auth-interfaces/userLoginResponse";
import {UserRegistration} from "../interfaces/auth-interfaces/userRegistration";
import {API_URL} from "../provider";


@Injectable()
export class AuthService {

  constructor(private http: HttpClient, @Inject(API_URL) private apiURL: string) {}

  get userCompanyName(): string | null {
    return localStorage.getItem('companyName')
  }

  set userCompanyName(newUserCompanyName) {
    if (newUserCompanyName) {
      localStorage.setItem('companyName', newUserCompanyName)
    }
  }

  get userEmail(): string | null {
    return localStorage.getItem('email')
  }

  set userEmail(newUserEmail: string | null) {
    if (newUserEmail) {
      localStorage.setItem('email', newUserEmail)
    }
  }

  login(userEmail: string, userPassword: string): Observable<UserLogin | null> {
    return this.http.post<UserLogin>(this.apiURL + '/users/auth', {"email":userEmail, "password":userPassword})
      .pipe(
        tap(this.setUserCompanyName)
      )
  }

  register(user: UserRegistration): Observable<string> {
    return this.http.post(this.apiURL + '/users/register', user, { responseType: "text"});
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
      localStorage.setItem('email', response.email)
    } else {
      localStorage.clear()
    }
  }
}
