import { Injectable } from '@angular/core';
import { Collector } from '../models/collector';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth_user';


@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return JSON.parse(sessionStorage.getItem(TOKEN_KEY) || '{}');
  }

  public saveUser(collector: Collector) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(collector));
}

public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || '{}');
}


}
