import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroAsistenciaLandingComponent } from './pantallas/landing/registro-asistencia-landing.component';
import { RegistroAsistenciaRoutingModule } from './registro-asistencia-routing.module';



@NgModule({
  declarations: [
    RegistroAsistenciaLandingComponent
  ],
  imports: [
    CommonModule,
    RegistroAsistenciaRoutingModule
  ]
})
export class RegistroAsistenciaModule { }
