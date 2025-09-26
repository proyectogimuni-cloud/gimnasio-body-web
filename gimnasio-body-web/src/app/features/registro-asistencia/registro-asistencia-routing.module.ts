import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroAsistenciaLandingComponent } from './pantallas/landing/registro-asistencia-landing.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroAsistenciaLandingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroAsistenciaRoutingModule {}
