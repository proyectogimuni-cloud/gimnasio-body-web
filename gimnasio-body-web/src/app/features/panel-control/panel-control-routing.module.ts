import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelControlLandingComponent } from './pantallas/landing/panel-control-landing.component';

const routes: Routes = [
  {
    path: '',
    component: PanelControlLandingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelControlRoutingModule {}
