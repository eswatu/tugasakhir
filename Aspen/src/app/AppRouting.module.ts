import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, pathMatch: 'full' },
  {path:'angkakredit', loadChildren:() => import('./credit-point/credit-point.module').then(m => m.CreditPointModule)},
  {path:'profile', loadChildren:() => import('./profile/profile.module').then(m => m.ProfileModule)},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
