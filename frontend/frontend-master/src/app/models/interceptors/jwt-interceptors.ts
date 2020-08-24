import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthApiService } from "src/app/services/api/auth-api.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(public router: Router, private auth: AuthApiService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.auth.logout();
            }
          }
        }
      )
    );
  }
}
