import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLandingComponent } from './pantallas/landing/main-landing.component';
import { MainRoutes } from './enums/main-routes.enum';
import { guardAuthChildGuard } from '../../core/guardianes/guard-auth.guard';

/**
 * Todo módulo de la aplicación que no sea core ni share, debe ir por lazy loading hijo del módulo main,
 * ya que también se verifica que el usuario esté logeado con el guardAuthChildGuard.
 * Las rutas deben definirse en MainRoutes, no se aceptan magic strings.
 */
const routes: Routes = [
  {
    path: '',
    component: MainLandingComponent,
    canActivateChild: [guardAuthChildGuard],
    children: [
      {
        path: MainRoutes.REGISTRO_ASISTENCIA,
        loadChildren: () =>
          import('../registro-asistencia/registro-asistencia.module').then(
            (m) => m.RegistroAsistenciaModule
          ),
      },
      {
        path: MainRoutes.PANEL_DE_CONTROL,
        loadChildren: () =>
          import('../panel-control/panel-control.module').then(
            (m) => m.PanelControlModule
          ),
      },
      {
        path: '',
        redirectTo: MainRoutes.REGISTRO_ASISTENCIA,
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: MainRoutes.REGISTRO_ASISTENCIA,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
