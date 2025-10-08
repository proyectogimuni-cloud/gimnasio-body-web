import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginOk, LoginRequest } from '../interfaces/auth.interfaces';
import { map, Observable, tap } from 'rxjs';
import { ApiResp } from '../../../core/interfaces/api-responses.interface';
import { environment } from '../../../../environments/environment.dev';
import { RutasCore } from '../../../core/enums/rutas-core.enum';
import { RutasAuth } from '../enums/rutas-auth.enum';

const TOKEN_KEY = 'w';
const USER_KEY = 'h';
/**
 * Servicio para la gestión de la autenticación, manejo del token,
 * y getters relacionados a la sesión.
 */
@Injectable({
  providedIn: 'root',
})
export class ServicioAuthService {
  private http = inject(HttpClient);

  /** Token de autenticación */
  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /** Parámetro que define si el usuario está logeado o nó, basado en la existencia del token.
   * En caso de que el usuario ponga cualquier token, y pueda "burlar" este guardian, el Token interceptor
   * se encargará de revisar la respuesta del back, el cual valida si el token es un token valido, si no lo es,
   * saca al usuario de la aplicación.
   */
  get isLoggedIn(): boolean {
    return !!this.token;
  }

  /**
   *
   * @param dto Payload del login
   * @returns Observable para realizar suscripción desde la pantalla
   */
  login(dto: LoginRequest): Observable<LoginOk> {
    return this.http
      .post<ApiResp<LoginOk>>(
        `${environment.baseUrl}/${RutasCore.AUTH}/${RutasAuth.LOGIN}`,
        dto
      )
      .pipe(
        map((r) => {
          if (!r.ok) throw new Error('Credenciales inválidas');
          return r.data;
        }),
        /** Se */
        tap((data) => {
          this.manejarTokenYData(data);
        })
      );
  }

  /**
   * Método para gestionar el token y la información del usuario en el storage
   * @param loginData Información del login
   */
  manejarTokenYData(loginData: LoginOk) {
    localStorage.setItem(TOKEN_KEY, loginData.token);
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        userId: loginData.userId,
        nombre: loginData.nombre,
        rol: loginData.rol,
      })
    );
  }

  /**
   * Método encargado de limpiar el local storage de la información del token y del usuario.
   */
  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}
