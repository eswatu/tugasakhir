import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialogModule} from '@angular/material/dialog';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from "@angular/material/table";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';





const modules = [
  MatSelectModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatProgressBarModule,
  MatButtonModule,
  MatDividerModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatTabsModule,
  MatDialogModule,
  MatSortModule,
  MatPaginatorModule
      
]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class ProfileMaterialModule { }
