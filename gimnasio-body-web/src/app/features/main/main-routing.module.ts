import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLandingComponent } from './pantallas/landing/main-landing.component';
import { MainRoutes } from './enums/main-routes.enum';

const routes: Routes = [
  {
    path: '',
    component: MainLandingComponent,
    children: [
      {
        path: MainRoutes.REGISTRO_ASISTENCIA,
        loadChildren: () => import('../registro-asistencia/registro-asistencia.module').then((m) => m.RegistroAsistenciaModule),
      },
       {
        path: MainRoutes.PANEL_DE_CONTROL,
        loadChildren: () => import('../panel-control/panel-control.module').then((m) => m.PanelControlModule),
      },
      { path: '', redirectTo: 'registro-asistencia', pathMatch: 'full' },
      { path: '**', redirectTo: 'registro-asistencia', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
