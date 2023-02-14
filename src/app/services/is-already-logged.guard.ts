import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class IsAlreadyLoggedGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !localStorage.getItem(CONSTANTS.JWT_TOKEN_KEY);
  }
  
}
