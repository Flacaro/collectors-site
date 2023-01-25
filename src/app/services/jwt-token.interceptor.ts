import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CONSTANTS } from "../constants";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/private")) {
      const jwtToken = localStorage.getItem(CONSTANTS.JWT_TOKEN_KEY);
      const headers = new HttpHeaders({
        Authorization: `Bearer ${jwtToken}`,
      });
      const newRequest = request.clone({ headers });

      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
