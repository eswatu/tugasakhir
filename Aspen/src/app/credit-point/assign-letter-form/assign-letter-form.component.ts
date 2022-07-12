import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        ltNumber: ['', Validators.required],
        ltDate: [new Date(), Validators.required],
        ltDateStart: ['', Validators.required],
        ltDateEnd: ['', Validators.required],
        ltNote: [''],
        ltActive: [this.active]
      });
 }

  ngOnInit() {
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
    
    let al = <assignLetter>{};
      al.ltNumber = this.formInput.get('ltNumber').value;
      al.ltDate = this.formInput.get('ltDate').value;
      al.ltNote = this.formInput.get('ltNote').value;
      al.ltDateStart = new Date(this.formInput.get('ltDateStart').value);
      al.ltDateEnd = new Date(this.formInput.get('ltDateEnd').value);
      al.ltActive = this.formInput.get('ltActive').value;
    
    this.als.post<assignLetter>(al).subscribe(
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

  closeDialog(){
    this.dialogRef.close();
  }
}
