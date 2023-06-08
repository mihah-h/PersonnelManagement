import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../provider";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {AdminInformation} from "../interfaces/admin-interfaces/adminInformation";

@Injectable()
export class AdminService {

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    @Inject(API_URL) private apiURL: string) {}

  getAdminInformation(): Observable<AdminInformation> {
    return this.http.get<AdminInformation>(this.apiURL + '/users?email=' + this.auth.userEmail)
  }

  putAdminCompanyName(adminInformation: AdminInformation): Observable<string> {
    return this.http.put(this.apiURL + '/users?email='
      + this.auth.userEmail + '&changeCompany=true', adminInformation, {responseType: "text"})
  }

  putAdminEmail(adminInformation: AdminInformation): Observable<string> {
    return this.http.put(this.apiURL + '/users?email='
      + this.auth.userEmail + '&changeEmail=true', adminInformation, {responseType: "text"})
  }
}
