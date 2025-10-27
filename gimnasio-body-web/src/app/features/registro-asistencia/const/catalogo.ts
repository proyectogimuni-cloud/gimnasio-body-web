export const GENEROS = ['Femenino', 'Masculino'] as const;
export type Genero = typeof GENEROS[number];

export const CARRERAS = [
  'Comunicación Social',
  'Administración de Negocios Internacionales',
  'Licenciatura en Artes',
  'Ingeniería Informática',
  'Trabajo Social',
  'Ingeniería Agroindustrial',
  'Ingeniería Agronómica',
  'Ingeniería Ambiental y de Saneamiento',
  'Ingeniería de Producción',
  'Ingeniería en Higiene y Seguridad Industrial',
  'Tecnología en Obras Civiles',
  'Tecnología en Operación de Sistemas Electromecánicos',
  'Tecnología en Seguridad y Salud en el Trabajo',
  'Técnico Profesional en Procesos de Extracción de Biomasa Energética',
  'Técnico Profesional en Operación de Transporte Multimodal',
] as const; 

export type Carrera = typeof CARRERAS[number];

export const CARRERA_LABELS: Record<Carrera, string> = Object.freeze(
  CARRERAS.reduce((acc, c) => { acc[c] = c; return acc; }, {} as Record<Carrera, string>)
);
