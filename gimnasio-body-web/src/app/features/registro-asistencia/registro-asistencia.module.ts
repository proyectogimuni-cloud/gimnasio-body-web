import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroAsistenciaLandingComponent } from './pantallas/landing/registro-asistencia-landing.component';
import { RegistroAsistenciaRoutingModule } from './registro-asistencia-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegistroAsistenciaLandingComponent],
  imports: [CommonModule, RegistroAsistenciaRoutingModule, ReactiveFormsModule],
})
export class RegistroAsistenciaModule {}
