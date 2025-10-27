import { Component, Inject, OnInit } from '@angular/core';
import { TOKEN_KEY, USER_KEY } from '../../../auth/const/auth.const';
import { ServicioAuthService } from '../../../auth/servicios/servicio-auth.service';
import { Router } from '@angular/router';

/**
 * Componente encargado de gestionar el usuario y la foto de perfíl del admin
 */
@Component({
  selector: 'app-perfil-miniatura',
  templateUrl: './perfil-miniatura.component.html',
  styleUrl: './perfil-miniatura.component.scss',
})
export class PerfilMiniaturaComponent implements OnInit {
  /**
   * Nombre del usuario
   */
  nombre = '';
  /**
   * Rol del usuario
   */
  rol = '';
  constructor(
    private ServicioAuthService: ServicioAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem(TOKEN_KEY);
    const userRaw = localStorage.getItem(USER_KEY);

    if (!token || !userRaw) return this.logout();

    const user = JSON.parse(userRaw);

    if (!user?.nombre || !user?.rol || !user?.userId) return this.logout();

    this.nombre = user.nombre;
    this.rol = user.rol;
  }

  private logout(): void {
    this.ServicioAuthService.clearSession();
    this.router.navigate(['/auth']);
  }
}
