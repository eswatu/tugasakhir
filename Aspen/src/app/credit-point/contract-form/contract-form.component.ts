import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, FormGroupDirective, MaxValidator, MinValidator, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { contract } from '@env/model';
import { AuthenticationService, UserService } from '@env/services';
import { ContractService } from '@env/services/contract.service';
import { map, Observable } from 'rxjs';
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
  userid;

  constructor(private uservice: AuthenticationService,
    private ctrService: ContractService,
    private dialogRef: MatDialogRef<ContractFormComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data) {
      this.uservice.user.subscribe(x => this.userid = x.id);

      if (data) {
          this.id = data.id;
      }
      this.formInput = fb.group({
        contractName: ['', Validators.required, Validators.maxLength(40)],
        contractDate: [new Date(),Validators.required],
        contractYear: [2022,[Validators.required, Validators.min(2022),
                        Validators.minLength(4), Validators.maxLength(4)],[this.isDupeYear()]],
        contractValue: ['',[Validators.required, Validators.min(1), Validators.maxLength(3)]],
        contractNote: ['', Validators.maxLength(100)],
        isActive: [true,Validators.required]
      }, {updateOn: 'blur'} );
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
      this.contract.id = this.id;
      this.ctrService.put<contract>(this.contract).subscribe(res => {
        Swal.fire(res.message);
      }, error => console.error(error));
      this.closeDialog();
    } else {
    let ctrct = this.getFormValue();
    this.ctrService.post<contract>(ctrct).subscribe(result => {
      Swal.fire(result);
    }, error => console.error(error));
    this.closeDialog();
    }
    }

  closeDialog(){
    this.dialogRef.close();
  }
  isDupeYear(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      var ctr = <any>{};
      ctr.year = parseInt(control.value);
      ctr.userid = this.userid;

      return this.ctrService.isDupeYear(ctr)
        .pipe(map(result => {
              return (result ? { isDupeYear: true} : null);
      }));
    }
  }
  matcher = new MyErrorStateMatcher();
  //error message
  get ErrorMessageCY() : string{
    const cy: FormControl = (this.formInput.get('contractYear') as FormControl);
    return cy.hasError('required') ? 'Tahun Tidak boleh kosong':
    cy.hasError('min') ? 'Tahun Tidak boleh kurang dari ' + cy.errors.min.min :
    cy.hasError('isDupeYear') ? 'Tidak boleh mengubah ke tahun kontrak yang sudah ada!' : '';
    }
    get ErrorMessageCV() : string{
      const c: FormControl = (this.formInput.get('contractValue') as FormControl);
      return c.hasError('required') ? 'Target Harus diisi':
      c.hasError('min') ? 'Tahun Tidak boleh kurang dari ' + c.errors.min.min : '';
    }
    get ErrorMessageCN() : string{
      const c: FormControl = (this.formInput.get('contractName') as FormControl);
      return c.hasError('required') ? 'Nama Kontrak tidak boleh kosong': '';
    }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}