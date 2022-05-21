import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { assignLetter } from '@env/model/acts';
import { AssignLetterService } from '@env/services/assign-letter.service';

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
  onSubmit(){
    let al = <assignLetter>{};
      al.ltNumber = this.formInput.get('ltNumber').value;
      al.ltDate = this.formInput.get('ltDate').value;
      al.ltShare = this.formInput.get('ltShare').value;
      al.ltNote = this.formInput.get('ltNote').value;
      al.ltDateStart = this.sd;
      al.ltDateEnd = this.ed;
    
    console.log(al);
    // this.als.post<assignLetter>(al).subscribe(result => {
    //   if (result) {
    //     Swal.fire(JSON.stringify(result));
    //   }
    // }, error => console.error(error));
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
