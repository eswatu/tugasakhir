import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';

const modules = [
  ButtonModule,
  InputTextModule,
  ToolbarModule,
  DialogModule,
  ];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,

})
export class MaterialModule { }
