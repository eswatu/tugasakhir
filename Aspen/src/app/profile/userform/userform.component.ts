import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
        username: ['', [Validators.required, Validators.pattern("^[a-z0-9_-]{8,15}$"), Validators.minLength(6), Validators.maxLength(20)]],
        name: ['', Validators.required, Validators.minLength(5), Validators.maxLength(60)],
        role: ['', Validators.required],
        level: [''],
        baseAngkre:['', Validators.required, Validators.min(60), Validators.minLength(2), Validators.maxLength(2)],
        password: ['', [Validators.required, Validators.pattern("^[a-z0-9_-]{8,15}$")], Validators.minLength(4), Validators.maxLength(30)],
        repassword: ['', [Validators.required, Validators.pattern("^[a-z0-9_-]{8,15}$")], Validators.minLength(4), Validators.maxLength(30)]
      },{ validator : MustMatch('password', 'repassword')})
    }
  //error message
  get ErrorMessageUsername() : string{
    const c: FormControl = (this.formInput.get('username') as FormControl);
    return c.hasError('required') ? 'Username tidak boleh kosong':
          c.hasError('pattern') ? 'Username harus 8-15 karakter dan hanya huruf, angka, dan underscore':'';
  }
  get ErrorMessageName() : string{
    const c: FormControl = (this.formInput.get('name') as FormControl);
    return c.hasError('required') ? 'Nama Pengguna tidak boleh kosong':'';
  }
  get ErrorMessageRole() : string{
    const c: FormControl = (this.formInput.get('role') as FormControl);
    return c.hasError('required') ? 'Kewenangan tidak boleh kosong, silakan masukkan "User" atau "Admin"':'';
  }
  get ErrorMessageBaseAngkre() : string{
    const c: FormControl = (this.formInput.get('baseAngkre') as FormControl);
    return c.hasError('required') ? 'Angka Kredit Awal tidak boleh kosong':
          c.hasError('min') ? 'Angka Kredit Awal minimal 60':'';
  }
  get ErrorMessagePassword() : string{
    const c: FormControl = (this.formInput.get('password') as FormControl);
    return c.hasError('required') ? 'Password tidak boleh kosong':
          c.hasError('pattern') ? 'Password harus 8-15 karakter dan hanya huruf, angka, dan underscore':'';
  }
  get ErrorMessageRepassword() : string{
    const c: FormControl = (this.formInput.get('repassword') as FormControl);
    return c.hasError('required') ? 'Password (Ulang) tidak boleh kosong':
          c.hasError('pattern') ? 'Password harus 8-15 karakter dan hanya huruf, angka, dan underscore':'';
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
