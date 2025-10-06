export interface ApiOk<T> { ok: true; data: T; }
export interface ApiErr { ok: false; message: string; }
export type ApiResp<T> = ApiOk<T> | ApiErr;