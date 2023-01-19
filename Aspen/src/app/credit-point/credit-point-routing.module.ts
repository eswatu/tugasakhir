import { ContractListComponent } from './contract-list/contract-list.component';
import { SubmissionListComponent } from './submission-list/submission-list.component';
import { AssignLetterTableComponent } from './assign-letter-table/assign-letter-table.component';
import { CreditPointTableComponent } from './credit-point-table/credit-point-table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AngkreTabComponent } from './angkre-tab/angkre-tab.component';
import { ValuationTableComponent } from './valuation-table/valuation-table.component';

const routes: Routes = [
  { path: '', component: AngkreTabComponent },
  { path: 'pekerjaan', component: CreditPointTableComponent },
  { path: 'surattugas', component: AssignLetterTableComponent },
  { path: 'penilaian', component: ValuationTableComponent },
  { path: 'pengajuan', component: SubmissionListComponent },
  { path: 'konkin', component: ContractListComponent }

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditPointRoutingModule { }
