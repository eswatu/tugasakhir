import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {DropdownModule} from 'primeng/dropdown';



const modules = [
  MatListModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatCardModule,
  MatExpansionModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  DropdownModule
  ];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class dashbMaterialModule { }
