import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './componentes/login/login.component';
import { AuthLandingComponent } from './pantallas/landing/auth-landing.component';



@NgModule({
  declarations: [
    LoginComponent,
    AuthLandingComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
