import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fileInfo } from '@env/model/fileType';
import { AssignLetterService } from '@env/services/assign-letter.service';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css']
})
export class FileUploadDialogComponent implements OnInit {
  currentFile? : File;
  progress = 0;
  selectedFiles?: FileList;
  message = "";
  id;
  currentLetterInfo: fileInfo;

  constructor(private dialogRef: MatDialogRef<FileUploadDialogComponent>,
    private assignLetterService: AssignLetterService, 
    @Inject(MAT_DIALOG_DATA) data) {
      if (data) { this.id = data.id; }
     }

  ngOnInit(): void {
    console.log('dari form, isi id adalah: ' + this.id);
    if (this.id){
      this.getInfo();
    }
  }
  
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  getInfo(){
    this.assignLetterService.getFileInfo(this.id).subscribe(result => {
      console.log(result);
      this.currentLetterInfo = result;
    });
  }
  upload() {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.assignLetterService.uploadFile(this.currentFile, "1").subscribe({
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
  closeDialog(){
    this.currentLetterInfo = null;
    this.dialogRef.close();
  }
}
