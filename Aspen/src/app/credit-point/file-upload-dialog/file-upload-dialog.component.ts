import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { fileInfo } from '@env/model/fileType';
import { AssignLetterService } from '@env/services/assign-letter.service';
import { FormControl } from '@angular/forms';
import { ActService } from '@env/services/act.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css']
})
export class FileUploadDialogComponent implements OnInit {
  notes: FormControl;
  currentFile? : File;
  progress = 0;
  selectedFiles?: FileList;
  message = "";
  id;
  currentLetterInfos;
  title: string;
  mode: string;
  constructor(private dialogRef: MatDialogRef<FileUploadDialogComponent>,
    private assignLetterService: AssignLetterService,
    private actService: ActService,
    @Inject(MAT_DIALOG_DATA) data) {
      if (data) {
        this.id = data.id;
        this.title = data.title;
        this.mode = data.mode;
      }
      this.notes = new FormControl('');
     }
  ngOnInit(): void {
    if (this.id){
      this.getInfo();
    }
  }
  
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  getInfo(){
    if (this.mode === "ST") {
    this.assignLetterService.getFileInfo(this.id).subscribe(result => {
      console.log(result);
      this.currentLetterInfos = result;
    });
  } else if (this.mode === "LAP") {
    this.actService.getFileInfo(this.id).subscribe(result => {
      if (result){
      console.log(result);
      this.currentLetterInfos = result;
      } else {
        this.currentLetterInfos = null;
      }
    });
  }
  }
  confirmDelete(id:number) {
    Swal.fire({
      title: 'Yakin hapus file ini?',
      text: "Anda tidak bisa mengembalikan file terhapus!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus saja!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.actService.deletefile(id).subscribe(result => {
          console.log(result);
          if (result) {
            Swal.fire(
              'Terhapus!',
              result,
              'success'
            )
            this.closeDialog();
          }
        })
      }
    })
  }
  download(id:number, name: string){
    if (this.mode === "ST") {
        this.assignLetterService.downloadFile(id).subscribe(
          (response: any) =>{
              let data = response;
              let dataType = data.type;
              let binaryData = [];
              binaryData.push(response);
              let downloadLink = document.createElement('a');
              downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
              if (data.name)
                  downloadLink.setAttribute('download', data.name);
              document.body.appendChild(downloadLink);
              window.open(downloadLink.href);
          }
      );
  } else if (this.mode === "LAP") {
    this.actService.downloadFile(id).subscribe(
      (response: any) =>{
          let data = response;
          let dataType = data.type;
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          if (data.name)
              downloadLink.setAttribute('download', data.name);
          document.body.appendChild(downloadLink);
          window.open(downloadLink.href);
      }
  );
  }
}
  upload() {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        if (this.mode === "ST") {
        this.assignLetterService.uploadFile(this.currentFile, this.id, this.notes.value).subscribe({
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
            this.notes.reset();
          }
        });
      } else if (this.mode === "LAP") {
        this.actService.uploadFile(this.currentFile, this.id, this.notes.value).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              Swal.fire(
                'Berhasil!',
                event.body,
                'success'
              )
              this.closeDialog();
            }
            console.log(event);
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
            this.notes.reset();
          }
        });
      }
      }
      this.selectedFiles = undefined;
    }
  }
  closeDialog(){
    this.currentLetterInfos = null;
    this.dialogRef.close();
  }
}
