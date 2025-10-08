export const GENEROS = ['Femenino', 'Masculino'] as const;
export type Genero = typeof GENEROS[number];

export const CARRERAS = [
  'Ingenieria', 'Administracion', 'Salud', 'Derecho', 'Arquitectura', 'Educacion', 'Deportes'
] as const;

export const CARRERA_LABELS: Record<Carrera, string> = {
  Ingenieria: 'Ingeniería',
  Administracion: 'Administración',
  Salud: 'Salud',
  Derecho: 'Derecho',
  Arquitectura: 'Arquitectura',
  Educacion: 'Educación',
  Deportes: 'Deportes'
};
export type Carrera = typeof CARRERAS[number];
