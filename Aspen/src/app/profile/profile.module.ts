import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProfileMaterialModule } from './profile-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserlistComponent } from './userlist/userlist.component';
import { UserformComponent } from './userform/userform.component';
import { ProfileTabComponent } from './profile-tab/profile-tab.component';
import { JenjangPipe } from '../_helpers/jenjang.pipe';
import { ButtonModule } from "primeng/button";
import { DynamicDialogModule } from "primeng/dynamicdialog";


@NgModule({
  declarations: [
    UserdetailComponent,
    UserlistComponent,
    UserformComponent,
    ProfileTabComponent,
    JenjangPipe,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ProfileMaterialModule,
    SweetAlert2Module,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    ButtonModule,
    DynamicDialogModule
  ],
  entryComponents: [
    UserformComponent
  ]
})
export class ProfileModule { }
