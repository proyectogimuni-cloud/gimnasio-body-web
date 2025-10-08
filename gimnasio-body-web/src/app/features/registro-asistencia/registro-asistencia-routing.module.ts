import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroAsistenciaLandingComponent } from './pantallas/landing/registro-asistencia-landing.component';
import { RegistroAsistenciaCrudComponent } from './pantallas/crud/registro-asistencia-crud.component';
import { RegistroAsistenciaRoutes } from './enums/rutas-registro-asistencia.enum';

/**
 * 
 * Las rutas deben definirse en RegistroAsistenciaRoutes, no se aceptan magic strings.
 */
const routes: Routes = [
  {
    path: RegistroAsistenciaRoutes.REGISTRO_ASISTENCIA_LANDING,
    component: RegistroAsistenciaLandingComponent,
  },
  {
    path: RegistroAsistenciaRoutes.CREAR_CLIENTE,
    component: RegistroAsistenciaCrudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroAsistenciaRoutingModule {}
