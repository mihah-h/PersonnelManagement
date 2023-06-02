import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import {UserLogin} from "../interfaces/auth-interfaces/userLogin";
import {UserLoginResponse} from "../interfaces/auth-interfaces/userLoginResponse";
import {AdminRegistration} from "../interfaces/auth-interfaces/adminRegistration";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  get token(): string | null {
    return localStorage.getItem('token')
  }

  login(user: UserLogin): Observable<UserLoginResponse | null> {
    localStorage.setItem('token', '23323223')
    return this.http.post<UserLoginResponse>('', user)
      .pipe(
        tap(this.setToken)
      )
  }


  register(user: AdminRegistration): Observable<any> {
    console.log(user)
    return this.http.post('', user)
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: UserLoginResponse | null) {
    if (response) {
      localStorage.setItem('token', response.token)
    } else {
      localStorage.clear()
    }
  }
}
