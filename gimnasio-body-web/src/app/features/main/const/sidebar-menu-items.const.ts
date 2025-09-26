import { MainRoutes } from '../enums/main-routes.enum';
import { SidebarMenuItem } from '../interfaces/sidebar.interface';

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    ruta: MainRoutes.REGISTRO_ASISTENCIA,
    texto: 'Registro ingreso',
    icono: 'search',
  },
  {
    ruta: MainRoutes.PANEL_DE_CONTROL,
    texto: 'Panel de control',
    icono: 'search',
  },
];
