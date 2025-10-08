import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelControlLandingComponent } from './pantallas/landing/panel-control-landing.component';
import { PanelControlRoutingModule } from './panel-control-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';

/**
 * Módulo para las analíticas
 */
@NgModule({
  declarations: [PanelControlLandingComponent],
  imports: [
    CommonModule,
    PanelControlRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ChartModule,
    FormsModule,
  ],
})
export class PanelControlModule {}
