import { Genero } from "../../registro-asistencia/const/catalogo";

export interface RegistroAsistencia {
  _id: string;
  usuarioClienteId: string;
  identificacion: string;
  genero: Genero;
  carrera: string;
  edad: number;
  fechaIngreso: string;
  fechaSalida?: string;
}
export interface AsistenciaSearchReq {
  page?: number; limit?: number;
  identificacion?: string;
  genero?: Genero[] | Genero;
  carrera?: string[] | string;
  desde?: string; hasta?: string;
  abierto?: boolean | 'true' | 'false';
  cerrado?: boolean | 'true' | 'false';
}
export interface AsistenciaSearchResp {
  page: number; limit: number; total: number;
  items: RegistroAsistencia[];
}
