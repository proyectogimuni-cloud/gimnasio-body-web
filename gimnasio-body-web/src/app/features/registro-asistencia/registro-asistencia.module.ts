import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroAsistenciaLandingComponent } from './pantallas/landing/registro-asistencia-landing.component';
import { RegistroAsistenciaRoutingModule } from './registro-asistencia-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RegistroAsistenciaCrudComponent } from './pantallas/crud/registro-asistencia-crud.component';

/** Módulo encargado de gestionar el registro de asistencia junto con el registro de usuarios
 * clientes a la plataforma.
 * El componente RegistroAsistenciaLangindComponent gestiona el control de acceso al gimnasio basado
 * en el documento de identidad del usuario, en caso de que el usuario no esté registrado y se desee 
 * registrar, se redirecciona a RegistroAsistenciaCrudComponent, el cual se encarga del registro.
 */
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
