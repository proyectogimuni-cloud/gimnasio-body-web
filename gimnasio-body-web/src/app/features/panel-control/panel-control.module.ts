import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelControlLandingComponent } from './pantallas/landing/panel-control-landing.component';
import { PanelControlRoutingModule } from './panel-control-routing.module';

@NgModule({
  declarations: [PanelControlLandingComponent],
  imports: [CommonModule, PanelControlRoutingModule],
})
export class PanelControlModule {}
