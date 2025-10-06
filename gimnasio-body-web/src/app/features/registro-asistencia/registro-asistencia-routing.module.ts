import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroAsistenciaLandingComponent } from './pantallas/landing/registro-asistencia-landing.component';
import { RegistroAsistenciaCrudComponent } from './pantallas/crud/registro-asistencia-crud.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroAsistenciaLandingComponent,
  },
  { path: 'crear-cliente', component: RegistroAsistenciaCrudComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroAsistenciaRoutingModule {}
