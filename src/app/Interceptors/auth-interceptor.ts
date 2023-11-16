// auth-interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService, private router: Router ){}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Obtén el token del almacenamiento local (o donde lo hayas almacenado)
    const token = this.cookieService.get('token')
    let req = request;
    if (token){
      req = request.clone ({
        setHeaders:{
          authorization: `bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
