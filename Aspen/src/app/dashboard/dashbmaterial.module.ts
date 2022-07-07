import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';



const modules = [
  MatProgressBarModule,
  MatCardModule,
  MatExpansionModule,
  MatButtonModule,
  MatIconModule,
  FlexLayoutModule,
  MatDividerModule
  ];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class dashbMaterialModule { }
