import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CreditPointTableComponent } from "./credit-point-table/credit-point-table.component";


const routes: Routes = [
  {path:'', component:CreditPointTableComponent}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditPointRoutingModule { }
