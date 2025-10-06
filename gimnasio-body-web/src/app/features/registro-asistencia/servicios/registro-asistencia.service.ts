import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResp } from '../../../core/interfaces/api-responses.interface';
import { environment } from '../../../../environments/environment.dev';
import { Carrera, Genero } from '../const/catalogo';

@Injectable({ providedIn: 'root' })
export class RegistroAsistenciaService {
  private http = inject(HttpClient);

  ingreso(identificacion: string, fecha?: string): Observable<string> {
    return this.http.post<ApiResp<{ id: string }>>(
      `${environment.baseUrl}/asistencia/ingreso`,
      { identificacion, fecha }
    ).pipe(map(r => {
      if (!r.ok) throw new Error('Error ingreso');
      return r.data.id;
    }));
  }

  salida(identificacion: string, fecha?: string): Observable<string> {
    return this.http.post<ApiResp<{ id: string }>>(
      `${environment.baseUrl}/asistencia/salida`,
      { identificacion, fecha }
    ).pipe(map(r => {
      if (!r.ok) throw new Error('Error salida');
      return r.data.id;
    }));
  }

   registrarCliente(dto: { identificacion: string; genero: Genero; carrera: Carrera; edad: number }): Observable<string> {
    return this.http.post<ApiResp<{ id: string }>>(
      `${environment.baseUrl}/clientes`, dto
    ).pipe(map(r => { if (!r.ok) throw new Error(r as any); return r.data.id; }));
  }

//   search(req: AsistenciaSearchReq): Observable<AsistenciaSearchResp> {
//     return this.http.post<ApiResp<AsistenciaSearchResp>>(
//       `${environment.baseUrl}/asistencia/search`, req
//     ).pipe(map(r => {
//       if (!r.ok) throw new Error('Error búsqueda');
//       return r.data;
//     }));
//   }
}
