/** Respuesta genérica de la API, bien sea ok, o con error */
export type ApiResp<T> = ApiOk<T> | ApiErr;
/** Respuesta positiva de la API, con T genérico por petición */
export interface ApiOk<T> { ok: true; data: T; }
/** Respuesta error de la API */
export interface ApiErr { ok: false; message: string; }