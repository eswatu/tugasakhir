import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { submission } from '@env/model/submission';
import { SubmissionService } from '@env/services/submission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-submission-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.css']
})
export class SubmissionFormComponent implements OnInit {
  id;
  submission : submission;

  formInput: FormGroup;
  constructor(private subService: SubmissionService,
    private dialogRef: MatDialogRef<SubmissionFormComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data) {
      //init data dari tabel
      if (data) {this.id = data;}
      //buat form
      this.formInput = fb.group({
        subName: ['', Validators.required],
        subDate: ['', Validators.required],
        subNote: ['', Validators.required]
      });
     }

  ngOnInit(): void {
    //cek apakah ada id
    if (this.id) {
      this.subService.get<submission>(this.id).subscribe(result => {
        this.submission = result;
        this.formInput.patchValue(result);

      }, error => console.error(error));
    }
  }
  closeDialog(){
    this.dialogRef.close();
  }
  onSubmit(){
    if (this.id) {
      this.submission.subName = this.formInput.get('subName').value;
      this.submission.subDate = this.formInput.get('subDate').value;
      this.submission.subNote = this.formInput.get('subNote').value;
      this.subService.put(this.submission).subscribe(res => {
        Swal.fire(
          res
        )
      });
    } else {
      this.submission = <submission>{}
        this.submission.subName = this.formInput.get('subName').value;
        this.submission.subDate = this.formInput.get('subDate').value;
        this.submission.subNote = this.formInput.get('subNote').value;
        this.subService.post(this.submission).subscribe(res => {
          Swal.fire(
            res.message
          )
        }, error => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            text: 'Sudah ada pengajuan aktif, selesaikan dahulu yang sudah ada'
          }
          )
        });
    }
  }
}

