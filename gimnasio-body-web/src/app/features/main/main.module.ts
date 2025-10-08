import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLandingComponent } from './pantallas/landing/main-landing.component';
import { SideBarComponent } from './componentes/sidebar/sidebar.component';
import { PerfilMiniaturaComponent } from './componentes/perfil-miniatura/perfil-miniatura.component';

/**
 * Este módulo es el módulo landing del aplicativo cuando se se tiene autenticación exitosa, 
 * Se encarga del layout global de la aplicación, incluyendo el sidebar (Menú)
 */
@NgModule({
  declarations: [
    MainLandingComponent,
    SideBarComponent,
    PerfilMiniaturaComponent,
  ],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
