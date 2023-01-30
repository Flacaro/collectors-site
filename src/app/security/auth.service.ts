import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CONSTANTS } from "../constants";
import { Observable } from "rxjs";
import { LoggedCollectorService } from "./logged-collector.service";
import { Collector } from "../models/collector";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private loggedCollectorService: LoggedCollectorService
  ) {}

  private API_LOGIN_URL = CONSTANTS.API_URL + "/auth/login";
  private API_REGISTRATION_URL = CONSTANTS.API_URL + "/auth/register";

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

  register(data: {
    name: string;
    surname: string;
    username: string;
    birthday: string;
    email: string;
    password: string;
  }): Observable<Collector> {
    return this.http.post<Collector>(this.API_REGISTRATION_URL, data);
  }
}
