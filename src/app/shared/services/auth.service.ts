import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import {UserLogin} from "../interfaces/auth-interfaces/userLogin";
import {UserLoginResponse} from "../interfaces/auth-interfaces/userLoginResponse";
import {UserRegistration} from "../interfaces/auth-interfaces/userRegistration";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  get token(): string | null {
    return localStorage.getItem('token')
  }

  login(user: UserLogin): Observable<UserLoginResponse | null> {
    console.log(user);
    localStorage.setItem('token', '23323223')
    return this.http.post<UserLoginResponse>('http://localhost:3000/users/auth', user)
      .pipe(
        tap(this.setToken)
      )
  }


  register(user: UserRegistration): Observable<UserRegistration> {
    // console.log(user);
    return this.http.post<UserRegistration>('http://localhost:3000/users/register', user);
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
