import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        switch (error.status) {
          case 404:
            errorMessage = `Error 404: Recurso no encontrado.`;
            break;
          case 500:
            errorMessage = `Error 500: Error interno del servidor.`;
            break;
          default:
            errorMessage = `Error ${error.status}: ${error.message}`;
            break;
        }

        this.router.navigate(['']);
        sessionStorage.clear();

        console.error(error);

        return throwError(() => error);
      })
    );
  }
}
