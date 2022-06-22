import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileTabComponent } from './profile-tab/profile-tab.component';

const routes: Routes = [
  {path: '', component: ProfileTabComponent}
]

@NgModule({
  declarations: [],
  imports: [
RouterModule.forChild(routes)
],
exports: [RouterModule]
})
export class ProfileRoutingModule { }
