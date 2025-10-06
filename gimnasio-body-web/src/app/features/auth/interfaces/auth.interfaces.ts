export interface LoginRequest { username: string; password: string; }

export interface LoginOk {
  userId: string;
  nombre: string;
  rol: string;
  token: string;
}
