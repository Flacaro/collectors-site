import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { LoggedCollectorService } from './logged-collector.service';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';


const TOKEN_HEADER_KEY = 'Autorization'; //per il backend

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private loggedUserService: LoggedCollectorService,
    private router: Router,
    private token: TokenStorageService) {}


  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   let authReq = req;
  //   const token = this.token.getToken();
  //   if(token != null) {
  //     //per backend
  //     authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  //   }
  //   return next.handle(authReq);

  // }

  // export const authInterceptorProviders = [
  //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  // ];

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const targetUrl = state.url;

      return this.loggedUserService.getCurrentCollector().pipe(
        map(collector => collector !== null),
        tap(isLogged => {
          if(isLogged) {
            return true;
          } else {
            this.router.navigate(['/auth/login'], { queryParams: { redirect: targetUrl } })
            return false;
          }
        })
      );
  }
  
}
