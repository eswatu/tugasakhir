import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { user } from '@env/model/user';
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
  formAvatar: FormControl;
  //ava upload
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  
  constructor(private userService: UserService) { }

  ngOnInit(){
    this.fileInfos = this.userService.getFiles();

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
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.userService.uploadAva(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.userService.getFiles();
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
//https://www.bezkoder.com/angular-material-12-file-upload/