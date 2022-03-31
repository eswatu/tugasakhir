import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditPointTableComponent } from './credit-point-table/credit-point-table.component';
import { CreditPointRoutingModule } from './credit-point-routing.module';



@NgModule({
  declarations: [
    CreditPointTableComponent
  ],
  imports: [
    CommonModule,
    CreditPointRoutingModule
  ]
})
export class CreditPointModule { }
