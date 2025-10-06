import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServicioAuthService } from '../../features/auth/servicios/servicio-auth.service';

const checkAuth = () => {
  const auth = inject(ServicioAuthService);
  const router = inject(Router);
  if (auth.isLoggedIn) return true;
  router.navigate(['/auth']);
  return false;
};

export const guardAuthGuard: CanActivateFn = () => checkAuth();
export const guardAuthChildGuard: CanActivateChildFn = () => checkAuth();
