import { MainRoutes } from '../enums/main-routes.enum';
import { SidebarMenuItem } from '../interfaces/sidebar.interface';

/**
 * Define los elementos del sidebar, las rutas no aceptan magic strings, se deben utilizar 
 * las rutas de MainRoutes
 */
export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    ruta: MainRoutes.REGISTRO_ASISTENCIA,
    texto: 'Registro ingreso',
    icono: 'hourglass_arrow_up',
  },
  {
    ruta: MainRoutes.PANEL_DE_CONTROL,
    texto: 'Panel de control',
    icono: 'computer_arrow_up',
  },
];
