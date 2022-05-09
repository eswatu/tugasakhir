import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    UserdetailComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SweetAlert2Module
  ]
})
export class ProfileModule { }
