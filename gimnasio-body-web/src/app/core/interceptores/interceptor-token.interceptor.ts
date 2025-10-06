import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ServicioAuthService } from '../../features/auth/servicios/servicio-auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: ServicioAuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clone = this.auth.token
      ? req.clone({
          setHeaders: { Authorization: `Bearer ${this.auth.token}` },
        })
      : req;

    return next.handle(clone).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.auth.clearSession();
          this.router.navigate(['/auth']); // TODO: Lanzar el toast
        }
        return throwError(() => err);
      })
    );
  }
}
