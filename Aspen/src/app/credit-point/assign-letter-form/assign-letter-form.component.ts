import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { assignLetter } from '@env/model/acts';
import { AssignLetterService } from '@env/services/assign-letter.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'assign-letter-form',
  templateUrl: './assign-letter-form.component.html',
  styleUrls: ['./assign-letter-form.component.css']
})
export class AssignLetterFormComponent implements OnInit {
  formInput: FormGroup;
  idAL;
  asgnLetter;
  shared: boolean = false;
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
        ltDate: ['', Validators.required],
        ltShare: [this.shared],
        ltDateStart: [''],
        ltDateEnd: ['', Validators.required],
        ltNote: [''],
      });
 }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    if (this.idAL) {
      this.als.get<assignLetter>(this.idAL).subscribe(result => {
        this.asgnLetter = result;
        this.formInput.patchValue(result);
      }, error => console.error(error));
    }
  }
  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {

      this.sd = dateRangeStart.value,
      this.ed = dateRangeEnd.value

  }
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
      al.ltDate = this.formInput.get('ltDate').value['_d'];
      al.ltShare = this.formInput.get('ltShare').value;
      al.ltNote = this.formInput.get('ltNote').value;
      al.ltDateStart = new Date(this.stringDate(this.sd));
      al.ltDateEnd = new Date(this.stringDate(this.ed));
    
    console.log(al);
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
