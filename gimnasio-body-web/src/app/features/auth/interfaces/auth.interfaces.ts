/** Interface utilizada para el request del login */
export interface LoginRequest { username: string; password: string; }

/** Respuesta correcta cuando se realiza el login */
export interface LoginOk {
  userId: string;
  nombre: string;
  rol: string;
  token: string;
}
