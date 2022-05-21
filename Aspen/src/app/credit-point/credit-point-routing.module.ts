import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreditPointTableComponent } from './credit-point-table/credit-point-table.component';
import { AngkreTabComponent } from './angkre-tab/angkre-tab.component';

const routes: Routes = [
  {path:'', component: AngkreTabComponent}  
]
@NgModule({
  imports: [RouterModule.forChild(routes),FlexLayoutModule],
  exports: [RouterModule]
})
export class CreditPointRoutingModule { }
