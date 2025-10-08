import { Component, inject } from '@angular/core';
import { SidebarMenuItem } from '../../interfaces/sidebar.interface';
import { SIDEBAR_MENU_ITEMS } from '../../const/sidebar-menu-items.const';
import { ServicioAuthService } from '../../../auth/servicios/servicio-auth.service';
import { Router } from '@angular/router';
import { RutasCore } from '../../../../core/enums/rutas-core.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SideBarComponent {
  private auth = inject(ServicioAuthService);
  private router = inject(Router);
  sidebarMenuItems: SidebarMenuItem[] = SIDEBAR_MENU_ITEMS;

  cerrarSesion() {
    this.auth.clearSession();
    this.router.navigate([RutasCore.AUTH]);
  }
}
