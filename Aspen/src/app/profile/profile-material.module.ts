import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';

const modules = [
MatButtonModule,
MatDividerModule,
MatButtonToggleModule,
MatFormFieldModule
]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class ProfileMaterialModule { }
