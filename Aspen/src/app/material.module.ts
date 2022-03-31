import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule,MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";


const modules = [MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  FlexLayoutModule,
  MatCardModule,
  MatDividerModule,
  MatToolbarModule,
  MatTableModule
  ];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}

  ]
})
export class MaterialModule { }
