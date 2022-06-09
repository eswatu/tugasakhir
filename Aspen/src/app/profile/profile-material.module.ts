import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';


const modules = [
      MatProgressBarModule,
      MatButtonModule,
      MatDividerModule,
      MatButtonToggleModule,
      MatFormFieldModule,
      MatInputModule,
      MatToolbarModule
]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class ProfileMaterialModule { }
