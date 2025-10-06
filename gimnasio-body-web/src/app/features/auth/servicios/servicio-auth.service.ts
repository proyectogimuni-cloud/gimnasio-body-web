import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginOk, LoginRequest } from '../interfaces/auth.interfaces';
import { map, Observable, tap } from 'rxjs';
import { ApiResp } from '../../../core/interfaces/api-responses.interface';
import { environment } from '../../../../environments/environment.dev';

const TOKEN_KEY = 'w';
const USER_KEY = 'h';
@Injectable({
  providedIn: 'root',
})
export class ServicioAuthService {
  private http = inject(HttpClient);

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
  get isLoggedIn(): boolean {
    return !!this.token;
  }

  login(dto: LoginRequest): Observable<LoginOk> {
    return this.http
      .post<ApiResp<LoginOk>>(`${environment.baseUrl}/auth/login`, dto)
      .pipe(
        map((r) => {
          if (!r.ok) throw new Error('Credenciales inválidas');
          return r.data;
        }),
        tap((data) => {
          localStorage.setItem(TOKEN_KEY, data.token);
          localStorage.setItem(
            USER_KEY,
            JSON.stringify({
              userId: data.userId,
              nombre: data.nombre,
              rol: data.rol,
            })
          );
        })
      );
  }

  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}
