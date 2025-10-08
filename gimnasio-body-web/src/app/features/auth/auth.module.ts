import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './componentes/login/login.component';
import { AuthLandingComponent } from './pantallas/landing/auth-landing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';

/**
 * Todo lo relacionado con autenticación se declara en este módulo. Login, 2fa, etc..
 */
@NgModule({
  declarations: [LoginComponent, AuthLandingComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
