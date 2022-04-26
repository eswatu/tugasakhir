import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { butirFull } from '@env/model/permen';

@Component({
  selector: 'app-credit-point-form',
  templateUrl: './credit-point-form.component.html',
  styleUrls: ['./credit-point-form.component.css']
})
export class CreditPointFormComponent implements OnInit {
  butirIn: butirFull;

  formInput : FormGroup;
  
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
    this.formInput.get('subUnsur').setValue(this.butirIn.subUnsur.namaSubUnsur);
    this.formInput.get('namaAkt').setValue(this.butirIn.aktivitas.namaAkt);

  }
}

/*
id: number;
namaButir: string;
tkButir: string;
hasilKerja: string;
jmlPoin: number;
levelReq: number;
subUnsur: subUnsur;
aktivitas: aktivitas;
*/