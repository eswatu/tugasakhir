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

  formInput = new FormGroup({
    butirId : new FormControl(''),
    butirVolume: new FormControl(''),
    userId: new FormControl('') 
  });
  constructor() { }

  ngOnInit(): void {
  }

  changeButir(item: butirFull){
    console.log(item);
    this.butirIn = item;
  }
}
