import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngkreTabComponent } from './angkre-tab/angkre-tab.component';

const routes: Routes = [
  {path:'', component: AngkreTabComponent}  
]
@NgModule({
  imports: [RouterModule.forChild(routes),FlexLayoutModule],
  exports: [RouterModule]
})
export class CreditPointRoutingModule { }
