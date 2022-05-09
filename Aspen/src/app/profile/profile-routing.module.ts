import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: UserdetailComponent}
]

@NgModule({
  declarations: [],
  imports: [
RouterModule.forChild(routes)
],
exports: [RouterModule]
})
export class ProfileRoutingModule { }
