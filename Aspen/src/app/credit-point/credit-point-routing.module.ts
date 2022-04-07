import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { ButirTreeComponent } from './butir-tree/butir-tree.component';
//import { CreditPointTableComponent } from "./credit-point-table/credit-point-table.component";


const routes: Routes = [
  {path:'', component: ButirTreeComponent}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditPointRoutingModule { }
