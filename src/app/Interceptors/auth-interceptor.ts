// auth-interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtén el token del almacenamiento local (o donde lo hayas almacenado)
    const token = localStorage.getItem('tu_token_jwt');

    // Clona la solicitud y agrega el token a las cabeceras
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Continúa con la siguiente manipulación de solicitudes
    return next.handle(request);
  }
}
