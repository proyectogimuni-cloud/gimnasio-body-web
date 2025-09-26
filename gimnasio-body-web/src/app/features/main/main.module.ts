import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLandingComponent } from './pantallas/landing/main-landing.component';
import { SideBarComponent } from './componentes/sidebar/sidebar.component';


@NgModule({
  declarations: [
    MainLandingComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
