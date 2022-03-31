import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditPointTableComponent } from './credit-point-table/credit-point-table.component';
import { CreditPointRoutingModule } from './credit-point-routing.module';
import { CreditPointFormComponent } from './credit-point-form/credit-point-form.component';
import { cpMaterialModule } from './cpmaterial.module';


@NgModule({
  declarations: [
    CreditPointTableComponent,
    CreditPointFormComponent
  ],
  imports: [
    CommonModule,
    CreditPointRoutingModule,
    cpMaterialModule
  ]
})
export class CreditPointModule { }
