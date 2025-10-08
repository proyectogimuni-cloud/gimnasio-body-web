import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServicioAuthService } from '../../features/auth/servicios/servicio-auth.service';
import { RutasCore } from '../enums/rutas-core.enum';

/**
 * Función para validar si un usuario está autenticado o nó
 * Redirecciona al módulo de autenticación en caso de no estar autenticado.
 * @returns true si está autenticado, false si no lo está
 */
const checkAuth = () => {
  const auth = inject(ServicioAuthService);
  const router = inject(Router);
  if (auth.isLoggedIn) return true;
  router.navigate([`${RutasCore.AUTH}`]);
  return false;
};

/** Guard para la autenticación de módulos cargados por lazyloading */
export const guardAuthGuard: CanActivateFn = () => checkAuth();
/** Guard para la autenticación de módulos hijos cargados por lazyloading
 * @see MainRoutingModule
 */
export const guardAuthChildGuard: CanActivateChildFn = () => checkAuth();
