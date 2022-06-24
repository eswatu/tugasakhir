import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@env/model';
import { MustMatch, UserService } from '@env/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {
  formInput : FormGroup;
  user: User = <User>{};
  roles = ["", "User", "Admin"];
  id;

  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<UserformComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data) {
      if (data) {
        this.id = data.id;
      }
      this.formInput = this.fb.group({
        username: ['', [Validators.required, Validators.pattern("^[a-z0-9_-]{8,15}$")]],
        name: ['', Validators.required],
        role: ['', Validators.required],
        level: [''],
        baseAngkre:['', Validators.required],
        password: ['', [Validators.required, Validators.pattern("^[a-z0-9_-]{8,15}$")]],
        repassword: ['', [Validators.required, Validators.pattern("^[a-z0-9_-]{8,15}$")]]
      },{ validator : MustMatch('password', 'repassword')})
    }
    //getter untuk form
    get username(){
      return this.formInput.get('username');
    }
    
    closeDialog(){
      this.dialogRef.close(); 
    }
    ngOnInit(): void {
    this.loadUser();
  }


  loadUser(){
    if (this.id) {
      this.userService.get(this.id).subscribe(result => {
        this.user = result as User;
        console.log(result);
        this.formInput.patchValue({
          username:this.user.username,
          name: this.user.name,
          role: this.user.role,
          level: this.user.level,
          baseAngkre: this.user.baseAngkre
        });
      }, error => console.error(error));
    }
  }
  onSubmit(){
    this.user.username = this.formInput.get('username').value;
    this.user.name = this.formInput.get('name').value;
    this.user.role = this.formInput.get('role').value;
    this.user.baseAngkre = this.formInput.get('baseAngkre').value;
    this.user.level = this.user.baseAngkre < 100 ? '1' : this.user.baseAngkre >= 100 && this.user.baseAngkre < 150 ? '2' : '3'; 
    this.user.password = this.formInput.get('password').value;
    console.log(this.user);
    if (this.id) {
      this.user.id = this.id;
      this.userService.put<User>(this.user).subscribe(res => {
        Swal.fire(res.name);
      }, error => console.error(error));
    } else {
      this.userService.post<User>(this.user).subscribe(() =>
      Swal.fire('berhasil membuat baru'), error => console.error(error));
    }
    this.closeDialog();

  }

}
