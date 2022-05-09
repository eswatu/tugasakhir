import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { act } from '@env/model/acts';
import { butirFull} from '@env/model/permen';
import { ActService } from '@env/services/act.service';
import { PermenService } from '@env/services/permen.service';
import Swal from 'sweetalert2';
import { ButirTreeComponent } from '../butir-tree/butir-tree.component';

@Component({
  selector: 'credit-point-form',
  templateUrl: './credit-point-form.component.html',
  styleUrls: ['./credit-point-form.component.css']
})

export class CreditPointFormComponent {
  //stepper
  stepOne: ButirTreeComponent;
  formInput : FormGroup;
  isLinear = true;
  isThisStepDone :boolean = false;
  @ViewChild('stepper') private stepper: MatStepper;
  @ViewChild('stepTwo') private stepTwo: MatStepper;
  
  //form
  jenjang: string;
  id;
  butirId;
  job;
  butirDariTree: butirFull;
        
  constructor(private actService: ActService,
    private permenService: PermenService,
    private dialogRef : MatDialogRef<CreditPointFormComponent>,
     @Inject(MAT_DIALOG_DATA) data){
       if(data) {
          this.id = data.actId;
          this.butirId = data.butirId;
        }
     }
  
  ngOnInit() {
        //init form
      this.formInput = new FormGroup({
        //otomatis
            namaButir: new FormControl(''),
            tkButir: new FormControl(''),
            levelReq: new FormControl(''),
            jmlPoin: new FormControl(''),
            hasilKerja: new FormControl(''),
            userId: new FormControl(''),

            actDate: new FormControl({value: new Date()}),
            butirVolume: new FormControl(''),
            actNote: new FormControl('')
      });
    this.loadData();
      
    }
ngAfterViewInit(){
  if (this.id) {
    this.stepper.next();
  }
}    
loadData(){
  if (this.id && this.butirId) {
    this.actService.get<act>(this.id).subscribe(result => {
      this.job = result;
      this.formInput.patchValue({
        actDate: result.actDate,
        butirVolume: result.butirVolume,
        actNote: result.actNote
        });
      }, error => console.error(error));
    this.permenService.get<butirFull>(this.butirId).subscribe(res => {
      this.changeButir(res);
      }, error => console.error(error));
      
    //eo edit
    } else {
    this.formInput.patchValue(this.butirDariTree);
  }

}
  changeButir(butirIn: butirFull){
    this.butirDariTree = butirIn;
    console.log(this.butirDariTree);
    this.formInput.patchValue(this.butirDariTree);
    this.isThisStepDone = true;
    this.stepper.next();  
  }

  goBack(stepper: MatStepper){
    stepper.previous();
  }
  goNext(stepper: MatStepper){
    stepper.next();
  }
  onSubmit(){
    var job = <act>{};
    job.butirId = this.butirDariTree.id;
    job.butirVolume = this.formInput.get('butirVolume').value;
    //replace ya
    job.userId = 1;
    job.actDate = this.formInput.get('actDate').value;
    job.actNote = this.formInput.get('actNote').value;
    console.log(job);

    this.actService.post<act>(job).subscribe(
      result => {
        if (result) {
          Swal.fire(result.message);
          this.formInput.reset();
          }
      }, error => console.error(error));
  }
  closeDialog(){
    this.dialogRef.close();
  }
  setJenjang(level:number){
    switch (level) {
      case 1:
        this.jenjang = 'Terampil';
        break;
      case 2:
        this.jenjang = 'Mahir'
        break;
      case 3:
        this.jenjang = 'Terampil dan Mahir'
        break;
      case 4:
        this.jenjang = 'Penyelia';
        break;
      case 6:
        this.jenjang = 'Mahir dan Penyelia';
        break;
      case 7:
        this.jenjang = 'Terampil, Mahir, dan Penyelia';
        break;
      default:
        break;
    }
  }
}


