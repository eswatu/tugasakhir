import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { ProgressListComponent } from './progress-list/progress-list.component';

const routes: Routes = [
  {path:'', component: ProgressListComponent}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
