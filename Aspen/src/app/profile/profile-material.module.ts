import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from "primeng/togglebutton";
import { ImageModule } from "primeng/image";
import { ProgressBarModule } from "primeng/progressbar";
import {ProgressSpinnerModule} from 'primeng/progressspinner';



const modules = [
  TabViewModule,
  TableModule,
  InputTextModule,
  ToggleButtonModule,
  ImageModule,
  ProgressBarModule,
  DropdownModule,
  ProgressSpinnerModule
]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class ProfileMaterialModule { }
