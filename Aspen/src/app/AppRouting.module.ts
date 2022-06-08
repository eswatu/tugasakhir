import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path:'angkakredit', loadChildren:() => import('./credit-point/credit-point.module').then(m => m.CreditPointModule), canActivate: [AuthGuard]},
  {path:'profile', loadChildren:() => import('./profile/profile.module').then(m => m.ProfileModule),canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'angkakredit'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
