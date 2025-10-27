import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { guardAuthGuard } from './core/guardianes/guard-auth.guard';
import { RutasCore } from './core/enums/rutas-core.enum';

/**
 *
 * Rutas principales de la aplicación.
 * Todas deben estar bajo lazyloading para efectos de rendimiento.
 * Si se necesita proteger alguna ruta por autenticación,
 * utilizar el guardian guardAuthGuard en el canActivate.
 * Toda ruta debe agregarse en el enum RutasCore y luego utilizarse.
 * NO SON PERMITIDOS LOS MAGIC STRINGS.
 *  */

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: RutasCore.AUTH },
  {
    path: RutasCore.AUTH,
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    canActivate: [guardAuthGuard],
    path: RutasCore.MAIN,
    loadChildren: () =>
      import('./features/main/main.module').then((m) => m.MainModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
