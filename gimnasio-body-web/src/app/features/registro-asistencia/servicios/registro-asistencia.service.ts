import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResp } from '../../../core/interfaces/api-responses.interface';
import { environment } from '../../../../environments/environment.dev';
import {
  IngresoRequest,
  RegistrarClienteDTO,
  SalidaRequest,
} from '../interfaces/registro-asistencia.interfaces';

/** Gestiona el registro de ingreso/ salida de usuarios clientes al gimnasio.
 * También gestiona el registro de usuarios cliente al aplicativo.
 */
@Injectable({ providedIn: 'root' })
export class RegistroAsistenciaService {
  private http = inject(HttpClient);

  /**
   * Permite registrar el ingreso de un usuario ya registrado al gimnasio
   * @param ingresoRequest Payload para registrar el ingreso del usuario cliente
   * @returns
   */
  ingreso(ingresoRequest: IngresoRequest): Observable<string> {
    return this.http
      .post<ApiResp<{ id: string }>>(
        `${environment.baseUrl}/asistencia/ingreso`,
        {
          identificacion: ingresoRequest.identificacion,
          fecha: ingresoRequest?.fecha,
        }
      )
      .pipe(
        map((r) => {
          if (!r.ok) throw new Error('Error ingreso');
          return r.data.id;
        })
      );
  }

  /**
   * Permite registrar la hora de salida para un usuario
   * @param salidaRequest Payload para registrar la salida del usuario del gimnasio
   * @returns
   */
  salida(salidaRequest: SalidaRequest): Observable<string> {
    return this.http
      .post<ApiResp<{ id: string }>>(
        `${environment.baseUrl}/asistencia/salida`,
        {
          identificacion: salidaRequest.identificacion,
          fecha: salidaRequest?.fecha,
        }
      )
      .pipe(
        map((r) => {
          if (!r.ok) throw new Error('Error salida');
          return r.data.id;
        })
      );
  }

  /**
   * Permite registrar un nuevo cliente al aplicativo
   * @param dto Información del usuario a registrar
   * @returns
   */
  registrarCliente(dto: RegistrarClienteDTO): Observable<string> {
    return this.http
      .post<ApiResp<{ id: string }>>(`${environment.baseUrl}/clientes`, dto)
      .pipe(
        map((r) => {
          if (!r.ok) throw new Error(r as any);
          return r.data.id;
        })
      );
  }
}
