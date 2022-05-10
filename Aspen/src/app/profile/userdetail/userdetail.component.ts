import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { user } from '@env/model/user';
import { UserService } from '@env/services/user-service.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  isEditing:boolean = false;
  toggleButtonValue : string; 
  userId;
  userInfo: user;
  form : FormGroup;
  formAvatar: FormControl;
  
  constructor(private userService: UserService) { }

  ngOnInit(){
    this.formAvatar = new FormControl();
    this.form = new FormGroup({
      username: new FormControl(''),
      name: new FormControl(''),
      level: new FormControl(''),
      role: new FormControl(''),
    });
    this.loadData();
    this.toggleButtonValue = 'Ubah';
  }
  loadData(){
    this.userService.get<user>(1).subscribe(res => {
      this.userInfo = res;
      this.form.patchValue(res);
    }, error => console.error(error));
  }
  toggleEdit(){
    this.isEditing = !this.isEditing;
    this.toggleButtonValue = this.isEditing ? 'Simpan' : 'Ubah';
  }
  onSubmit(){
//not implemented
  }
}
