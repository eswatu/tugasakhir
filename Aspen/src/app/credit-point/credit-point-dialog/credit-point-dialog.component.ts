import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { butirFull } from '@env/model/permen';
import { ButirTreeComponent } from '../butir-tree/butir-tree.component';
import { CreditPointFormComponent } from '../credit-point-form/credit-point-form.component';

@Component({
  selector: 'app-credit-point-dialog',
  templateUrl: './credit-point-dialog.component.html',
  styleUrls: ['./credit-point-dialog.component.css']
})
export class CreditPointDialogComponent implements OnInit {
  @ViewChild('stepper') private stepper: MatStepper;
  isLinear: boolean = true;
  id;
  kodeButir;
  butirIn: butirFull;
  selectButir: ButirTreeComponent;
  formInput: CreditPointFormComponent;

  constructor( private dialogRef: MatDialogRef<CreditPointFormComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      if (data) {
        this.id = data.actId;
        this.kodeButir = data.butirId;
        console.log('kode act = ' + this.id + 'dan kode butir' + this.kodeButir);
      } }

  ngOnInit(): void {
    if (this.id) {
    }
  }
  changeButir(item: butirFull){
    this.nextStep(this.stepper);
    this.butirIn = item;
    console.log('butir berisi ' + this.butirIn);
  }
  nextStep(stepper: MatStepper){
    setTimeout(() => {           // or do some API calls/ Async events
      stepper.next();
     }, 1);
  }
  prevStep(stepper: MatStepper){
    stepper.previous();
  }
  closeForm(){
    this.dialogRef.close();
  }
}
