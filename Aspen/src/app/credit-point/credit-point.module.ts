import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditPointTableComponent } from './credit-point-table/credit-point-table.component';
import { CreditPointRoutingModule } from './credit-point-routing.module';
import { CreditPointFormComponent } from './credit-point-form/credit-point-form.component';
import { cpMaterialModule } from './cpmaterial.module';
import { HttpClientModule } from "@angular/common/http";
import { ButirTreeComponent } from './butir-tree/butir-tree.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreditPointTableComponent,
    CreditPointFormComponent,
    ButirTreeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CreditPointRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    cpMaterialModule
  ]
})
export class CreditPointModule { }
