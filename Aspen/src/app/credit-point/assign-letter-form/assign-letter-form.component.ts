import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { assignLetter } from '@env/model/acts';
import { AssignLetterService } from '@env/services/assign-letter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'assign-letter-form',
  templateUrl: './assign-letter-form.component.html',
  styleUrls: ['./assign-letter-form.component.css']
})
export class AssignLetterFormComponent implements OnInit {
  formInput: FormGroup;
  idAL;
  asgnLetter: assignLetter;
  shared: boolean = false;
  active: boolean = true;
  sd;
  ed;

  @ViewChild('dateRangeStart') public dateRangeStart :HTMLInputElement;
  @ViewChild('dateRangeEnd') public dateRangeEnd :HTMLInputElement;

  constructor(private als: AssignLetterService,
    private dialogRef: MatDialogRef<AssignLetterFormComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data) {
      if (data) {
        this.idAL = data.id;
      }
      this.formInput = fb.group({
        ltNumber: ['', [Validators.required, Validators.maxLength(40)]],
        ltDate: [new Date(), Validators.required],
        ltDateStart: ['', Validators.required],
        ltDateEnd: ['', Validators.required],
        ltNote: ['', Validators.maxLength(100)],
        ltActive: [this.active]
      });
 }
 //error message
 get ErrorMessageltNumber() : string{
  const c: FormControl = (this.formInput.get('ltNumber') as FormControl);
  return c.hasError('required') ? 'Nomor Surat Harus diisi': '';
}
get ErrorMessageltDate() : string{
  const c: FormControl = (this.formInput.get('ltDate') as FormControl);
  return c.hasError('required') ? 'Tanggal Surat Tugas Harus diisi': '';
}
get ErrorMessageltDatePeriod() : string{
  const c: FormControl = (this.formInput.get('ltDateStart') as FormControl);
  const d: FormControl = (this.formInput.get('ltDateEnd') as FormControl);

  return c.hasError('required') ? 'Tanggal Mulai Surat Tugas Harus diisi': 
          d.hasError('required') ? 'Tanggal Selesai Surat Tugas Harus diisi': '';
}

  ngOnInit() {
    this.asgnLetter = <assignLetter>{};
    this.loadData();
  }
  loadData(){
    if (this.idAL) {
      this.als.get<assignLetter>(this.idAL).subscribe(result => {
        this.asgnLetter = result;

        this.formInput.patchValue({
          ltNumber: this.asgnLetter.ltNumber,
          ltDate: new Date(this.asgnLetter.ltDate),
          ltNote: this.asgnLetter.ltNote,
          ltActive: this.asgnLetter.ltActive,
          ltDateStart: new Date(this.asgnLetter.ltDateStart),
          ltDateEnd: new Date(this.asgnLetter.ltDateEnd)
        });

      }, error => console.error(error));
    }
  }
  // dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {

  //     this.sd = dateRangeStart.value;
  //     this.ed = dateRangeEnd.value;
  // }
  //dd-MM-YYYY
  stringDate(inp:string) {
    let d = inp.substring(0,2);
    let m = inp.substring(3,5);
    let y = inp.substring(6,10);
    return String(m + '/' + d + '/' +y);
  }
  onSubmit(){
    this.asgnLetter.ltNumber = this.formInput.get('ltNumber').value;
    this.asgnLetter.ltDate = this.formInput.get('ltDate').value;
    this.asgnLetter.ltNote = this.formInput.get('ltNote').value;
    this.asgnLetter.ltDateStart = new Date(this.formInput.get('ltDateStart').value);
    this.asgnLetter.ltDateEnd = new Date(this.formInput.get('ltDateEnd').value);
    this.asgnLetter.ltActive = this.formInput.get('ltActive').value;
    
    if (this.idAL) {
      this.asgnLetter.id = this.idAL;
      this.als.put<assignLetter>(this.asgnLetter).subscribe(result => {
        if (result) {
          this.closeDialog();
        }
      }, error => {
        console.error(error);
        Swal.fire(error.message);
      });

    } else {
      this.als.post<assignLetter>(this.asgnLetter).subscribe(
        result => {
        if (result) {
          Swal.fire(result.message);
          this.closeDialog();
        }
      }, error => {
        console.error(error);
        Swal.fire(error.error.message);
      });
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
