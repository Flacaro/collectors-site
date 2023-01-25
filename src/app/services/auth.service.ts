import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CONSTANTS } from "../constants";
import { Observable } from "rxjs";
import { LoggedCollectorService } from "./logged-collector.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private loggedCollectorService: LoggedCollectorService) {}

  private API_LOGIN_URL = CONSTANTS.API_URL + "/auth/login";

  login(data: {
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.API_LOGIN_URL, data);
  }

  logout() {
    this.loggedCollectorService.setCurrentCollector(null);
    localStorage.clear();
  }

}
