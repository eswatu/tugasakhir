import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CreditPointFormComponent } from './credit-point-form/credit-point-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreditPointTableComponent } from './credit-point-table/credit-point-table.component';

//import { CreditPointTableComponent } from "./credit-point-table/credit-point-table.component";


const routes: Routes = [
  {path:'', component: CreditPointTableComponent}  
]
@NgModule({
  imports: [RouterModule.forChild(routes),FlexLayoutModule],
  exports: [RouterModule]
})
export class CreditPointRoutingModule { }
