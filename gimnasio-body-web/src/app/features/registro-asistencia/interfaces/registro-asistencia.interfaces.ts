import { Carrera, Genero } from "../const/catalogo";

/** Payload para registrar ingreso de un cliente. */
export interface IngresoRequest {
  /** Documento de identidad del usuario cliente. */
  identificacion: string;
  /** Fecha/Hora ISO opcional (si no, la define el backend). */
  fecha?: string;
}

/** Payload para registrar salida de un cliente. */
export interface SalidaRequest {
  /** Documento de identidad del usuario cliente. */
  identificacion: string;
  /** Fecha/Hora ISO opcional. */
  fecha?: string;
}

/** DTO para registrar un nuevo cliente. */
export interface RegistrarClienteDTO {
  identificacion: string;
  genero: Genero;
  carrera: Carrera;
  edad: number;
}