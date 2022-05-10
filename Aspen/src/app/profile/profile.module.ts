import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileMaterialModule } from './profile-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserdetailComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ProfileMaterialModule,
    SweetAlert2Module,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class ProfileModule { }
