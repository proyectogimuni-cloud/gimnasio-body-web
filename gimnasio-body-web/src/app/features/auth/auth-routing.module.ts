import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./componentes/login/login.component";
import { RutasAuth } from "./enums/rutas-auth.enum";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: RutasAuth.LOGIN, component: LoginComponent },
      { path: '', redirectTo: RutasAuth.LOGIN, pathMatch: 'full' },
      { path: '**', redirectTo: RutasAuth.LOGIN, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}