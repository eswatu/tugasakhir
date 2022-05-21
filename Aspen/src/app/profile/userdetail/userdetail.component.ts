import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { user } from '@env/model/user';
import { MustMatch } from '@env/services/mustmatch';
import { UserService } from '@env/services/user-service.service';
import { Observable } from 'rxjs';

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
  formPwd: FormGroup;
  formAvatar: FormControl;
  pictureImage;
  urlImage;
  
  //ava upload
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  
  constructor(private userService: UserService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder) { }

  ngOnInit(){

    this.formAvatar = new FormControl();
    //untuk form tampilan
    this.form = this.fb.group({
      username: [''],
      name    : [''],
      level   : [''],
      role    : [''],
    });
    //untuk password
    this.formPwd = this.fb.group({
      oldpwd  : ['', Validators.required],
      newPwd  : ['',Validators.required],
      renewPwd: ['', Validators.required]
    },
    { validator : MustMatch('newPwd', 'renewPwd')});
    //load data
    this.loadData();
    this.toggleButtonValue = 'Edit Mode';
  }

  loadData(){
    this.userService.get<user>(1).subscribe(res => {
      this.userInfo = res;
      this.form.patchValue(res);
      console.log('isi avatar id: ' + res.AvatarId);
      if (res.AvatarId){
        this.userService.downImage(res.AvatarId)
        .subscribe((img) => {
          let ftype = img['typename'];
          this.pictureImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:${ftype};base64,` + img['data']);
          });
      }
  }, error => console.error(error));
  }
  
  toggleEdit(){
    this.isEditing = !this.isEditing;
    this.toggleButtonValue = this.isEditing ? 'Stop Edit' : 'Edit Mode';
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.userService.uploadAva(this.currentFile, "1").subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          }
        });
      }
      this.selectedFiles = undefined;
    }
  }

}
