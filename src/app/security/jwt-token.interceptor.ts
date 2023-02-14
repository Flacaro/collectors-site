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
import { PersistenceService } from "../services/persistence/persistence-service";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(private persistenceService: PersistenceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const url = new URL(request.url);

    if (url.pathname.startsWith("/personal")) {
      const jwtToken = this.persistenceService.get(CONSTANTS.JWT_TOKEN_KEY);
      const headers = new HttpHeaders({
        Authorization: `Bearer ${jwtToken}`,
      });
      const newRequest = request.clone({ headers });

      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
