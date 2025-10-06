import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroAsistenciaLandingComponent } from './pantallas/landing/registro-asistencia-landing.component';
import { RegistroAsistenciaRoutingModule } from './registro-asistencia-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RegistroAsistenciaCrudComponent } from './pantallas/crud/registro-asistencia-crud.component';

@NgModule({
  declarations: [
    RegistroAsistenciaLandingComponent,
    RegistroAsistenciaCrudComponent,
  ],
  imports: [
    CommonModule,
    RegistroAsistenciaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class RegistroAsistenciaModule {}
