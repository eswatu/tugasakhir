import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { act } from '@env/model/acts';
import { butirFull} from '@env/model/permen';
import { ActService } from '@env/services/act.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'credit-point-form',
  templateUrl: './credit-point-form.component.html',
  styleUrls: ['./credit-point-form.component.css']
})

export class CreditPointFormComponent implements OnInit {
  butirIn: butirFull;
  jenjang: string;
  id;
  job;
  formInput : FormGroup;

  constructor(private actService: ActService){   }

  ngOnInit(): void {
    //init form
  this.formInput = new FormGroup({
    //otomatis
    subUnsur: new FormControl(''),
    namaAkt: new FormControl(''),
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

  if (this.id) {
    this.actService.get<act>(this.id).subscribe(result => {
      this.job = result;
      this.formInput.patchValue({
        actDate: result.actDate,
        butirVolume: result.butirVolume,
        actNote: result.actNote
      });
    }, error => console.error(error));
  }

  }
  onSubmit(){
    var job = <act>{};
    job.butirId = this.butirIn.id;
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