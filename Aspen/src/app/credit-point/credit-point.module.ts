import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditPointTableComponent } from './credit-point-table/credit-point-table.component';
import { CreditPointRoutingModule } from './credit-point-routing.module';
import { CreditPointFormComponent } from './credit-point-form/credit-point-form.component';
import { cpMaterialModule } from './cpmaterial.module';
import { HttpClientModule } from "@angular/common/http";
import { ButirTreeComponent } from './butir-tree/butir-tree.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DatePipe } from '@angular/common';
import { AssignLetterTableComponent } from './assign-letter-table/assign-letter-table.component';
import { AssignLetterFormComponent } from './assign-letter-form/assign-letter-form.component';
import { AngkreTabComponent } from './angkre-tab/angkre-tab.component';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY'
  }, display : {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@NgModule({
  declarations: [
    CreditPointTableComponent,
    CreditPointFormComponent,
    ButirTreeComponent,
    AssignLetterTableComponent,
    AssignLetterFormComponent,
    AngkreTabComponent
    ],
  imports: [
    CommonModule,
    HttpClientModule,
    CreditPointRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    cpMaterialModule,
    SweetAlert2Module
  ],
  providers: [ DatePipe,
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
//    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class CreditPointModule { }
