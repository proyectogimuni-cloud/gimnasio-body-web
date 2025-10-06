export const GENEROS = ['Femenino', 'Masculino'] as const;
export type Genero = typeof GENEROS[number];

export const CARRERAS = [
  'Ingenieria', 'Administracion', 'Salud', 'Derecho', 'Arquitectura', 'Educacion', 'Deportes'
] as const;
export type Carrera = typeof CARRERAS[number];
