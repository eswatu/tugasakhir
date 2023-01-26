import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { User } from '@env/model';
import { MustMatch, UserService } from '@env/services';
import Swal from 'sweetalert2';
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: 'userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {
  formInput : UntypedFormGroup;
  user: User = <User>{};
  roles = ["", "User", "Penilai","Admin"];
  id;
  // variable - default false
hide: boolean = true;
rehide: boolean = true;

  constructor(private userService: UserService,
    public fb: UntypedFormBuilder,
    public ref: DynamicDialogRef, public conf: DynamicDialogConfig) {
      // if (data) {
      //   this.id = data.id;
      // }
      this.formInput = this.fb.group({
        username: ['', [Validators.required, Validators.pattern("^[a-z0-9_-]{8,15}$"), Validators.minLength(6), Validators.maxLength(20)]],
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
        role: ['', Validators.required],
        level: [1],
        baseAngkre:['', [Validators.required, Validators.min(60), Validators.maxLength(3)]],
        password: ['', [Validators.required, Validators.pattern("^[a-z0-9_-]{8,15}$"), Validators.minLength(4), Validators.maxLength(30)]],
        repassword: ['', [Validators.required, Validators.pattern("^[a-z0-9_-]{8,15}$"), Validators.minLength(4), Validators.maxLength(30)]]
      },{ validator : MustMatch('password', 'repassword')});
    }
  //error message
  get ErrorMessageUsername() : string{
    const c: UntypedFormControl = (this.formInput.get('username') as UntypedFormControl);
    return c.hasError('required') ? 'Username tidak boleh kosong':
          c.hasError('pattern') ? 'Username harus 8-15 karakter dan hanya huruf, angka, dan underscore':'';
  }
  get ErrorMessageName() : string{
    const c: UntypedFormControl = (this.formInput.get('name') as UntypedFormControl);
    return c.hasError('required') ? 'Nama Pengguna tidak boleh kosong':'';
  }
  get ErrorMessageRole() : string{
    const c: UntypedFormControl = (this.formInput.get('role') as UntypedFormControl);
    return c.hasError('required') ? 'Kewenangan tidak boleh kosong, silakan masukkan "User" atau "Admin"':'';
  }
  get ErrorMessageBaseAngkre() : string{
    const c: UntypedFormControl = (this.formInput.get('baseAngkre') as UntypedFormControl);
    return c.hasError('required') ? 'Angka Kredit Awal tidak boleh kosong':
          c.hasError('min') ? 'Angka Kredit Awal minimal 60':'';
  }
  get ErrorMessagePassword() : string{
    const c: UntypedFormControl = (this.formInput.get('password') as UntypedFormControl);
    return c.hasError('required') ? 'Password tidak boleh kosong':
          c.hasError('pattern') ? 'Password harus 8-15 karakter dan hanya huruf, angka, dan underscore':'';
  }
  get ErrorMessageRepassword() : string{
    const c: UntypedFormControl = (this.formInput.get('repassword') as UntypedFormControl);
    return c.hasError('required') ? 'Password (Ulang) tidak boleh kosong':
          c.hasError('pattern') ? 'Password harus 8-15 karakter dan hanya huruf, angka, dan underscore':'';
  }

    //getter untuk form
    get username(){
      return this.formInput.get('username');
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
          username: this.user.username,
          name: this.user.name,
          role: this.user.role,
          level: this.user.level,
          baseAngkre: this.user.baseAngkre,
          password: this.user.username,
          repassword: this.user.username
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
       console.log(res);
      }, error => console.error(error));
    } else {
      this.userService.post<User>(this.user).subscribe(() =>
      Swal.fire('berhasil membuat baru'), error => console.error(error));
    }
  }
  password() {
    this.hide = !this.hide;
}
repassword() {
  this.rehide = !this.rehide;
}
}
