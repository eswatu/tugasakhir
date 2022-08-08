import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path:'dashboard', loadChildren:() => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]},
  {path:'angkakredit', loadChildren:() => import('./credit-point/credit-point.module').then(m => m.CreditPointModule), canActivate: [AuthGuard]},
  {path:'profile', loadChildren:() => import('./profile/profile.module').then(m => m.ProfileModule),canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'profile'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
