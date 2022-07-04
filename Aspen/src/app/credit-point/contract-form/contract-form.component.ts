import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { contract } from '@env/model';
import { ContractService } from '@env/services/contract.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css']
})
export class ContractFormComponent implements OnInit {
  formInput: FormGroup;
  id;
  contract;

  constructor(private ctrService: ContractService,
    private dialogRef: MatDialogRef<ContractFormComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data) {
      if (data) {
          this.id = data.id;
      }
      this.formInput = fb.group({
        contractName: [''],
        contractDate: [new Date()],
        contractYear: ['2022'],
        contractValue: [''],
        contractNote: [''],
        isActive: [true]
      });
    }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    if (this.id) {
      this.ctrService.get<contract>(this.id).subscribe(res => {
        this.contract = res;
        this.formInput.patchValue(res);
      }, error => console.error(error));
    }
  }
  getFormValue(): contract{
    let ctc = <contract>{};

    ctc.contractName = this.formInput.get('contractName').value;
    ctc.contractDate = this.formInput.get('contractDate').value;
    ctc.contractYear = this.formInput.get('contractYear').value;
    ctc.contractValue = this.formInput.get('contractValue').value;
    ctc.contractNote = this.formInput.get('contractNote').value;
    ctc.isActive = this.formInput.get('isActive').value;
    return ctc;
  }
  onSubmit(){
    if (this.id) {
      this.contract = this.getFormValue();
      this.ctrService.put<contract>(this.contract).subscribe(res => {
        console.log(res);
      }, error => console.error(error));
      this.closeDialog();
    } else {
    let ctrct = this.getFormValue();
    this.ctrService.post<contract>(ctrct).subscribe(result => {
      console.log(result);
    }, error => console.error(error));
    this.closeDialog();
    }
    }

  closeDialog(){
    this.dialogRef.close();
  }
}
