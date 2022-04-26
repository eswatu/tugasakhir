import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { butirFull, subUnsur, aktivita } from '@env/model/permen';

@Component({
  selector: 'app-credit-point-form',
  templateUrl: './credit-point-form.component.html',
  styleUrls: ['./credit-point-form.component.css']
})
export class CreditPointFormComponent implements OnInit {
  butirIn: butirFull;
  formInput : FormGroup;
  jenjang: string;  
  constructor() { }

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

    butirVolume: new FormControl('')
  });

  }

  changeButir(item: butirFull){
    this.butirIn = item;
    this.formInput.patchValue(this.butirIn);
    this.setJenjang(item.levelReq);
    console.log(this.butirIn);
    this.formInput.get('subUnsur').setValue(this.butirIn.SubUnsur.namaSubUnsur);
    this.formInput.get('namaAkt').setValue(this.butirIn.Aktivita.namaAkt);
    this.formInput.get('levelReq').setValue(this.jenjang);

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

/*level
terampil                  = 1
mahir                     = 2
terampil + mahir          = 3
penyelia                  = 4
penyelia + mahir          = 6
terampil, mahir, penyelia = 7
 */