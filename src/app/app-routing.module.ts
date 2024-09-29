import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ALoginComponent } from './components/authentication/a-login/a-login/a-login.component';
import { RSignUpComponent } from './components/register/r-sign-up/r-sign-up/r-sign-up.component';
import { TlcComponent } from './components/tasks/t-list/tl/tl-consulta/tlc/tlc.component';
import { TlgComponent } from './components/tasks/t-list/tl/tl-gestion/tlg/tlg.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: ALoginComponent },
  { path: 'sign-up', component: RSignUpComponent },
  {
    path: 'tasks-list',
    component: TlcComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-task',
    component: TlgComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
