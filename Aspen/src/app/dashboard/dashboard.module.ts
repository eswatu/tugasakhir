import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBlockComponent } from './progress-block/progress-block.component';
import { dashbMaterialModule } from "./dashbmaterial.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ProgressListComponent } from './progress-list/progress-list.component';


@NgModule({
  declarations: [
    ProgressBlockComponent,
    ProgressListComponent
  ],
  imports: [
    CommonModule,
    dashbMaterialModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
