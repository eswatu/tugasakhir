import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { act, assignLetter } from '@env/model/acts';
import { ApiResult } from '@env/services';
import { ActService } from '@env/services/act.service';
import { AssignLetterService } from '@env/services/assign-letter.service';
import Swal from 'sweetalert2';
import { ButirTreeComponent } from '../butir-tree/butir-tree.component';

@Component({
  selector: 'credit-point-form',
  templateUrl: './credit-point-form.component.html',
  styleUrls: ['./credit-point-form.component.css']
})

export class CreditPointFormComponent {
  //stepper
  formInput : FormGroup;

  //ini untuk st terpilih
  surattugas;

  //untuk mode edit dari tabel
  job : act = <act>{}; //untuk mode create dari butir
  jenjang: string;
  actMain;
  
  constructor(
    private actService: ActService,
    private assignLetterService: AssignLetterService,
    public dialog: MatDialog,
    private dialogRef : MatDialogRef<CreditPointFormComponent>,
     @Inject(MAT_DIALOG_DATA) data){
      //init data
        if(data) {
          if (data.id) {
            this.job.id = data.id;
          } else if (data.act) {
            this.job = data.act;
          }
         }
      //init form
    this.formInput = new FormGroup({
          AssignLetterId: new FormControl('', Validators.required),
          //otomatis
          namaButir: new FormControl(''),
          tkButir: new FormControl(''),
          levelReq: new FormControl(''),
          jmlPoin: new FormControl(''),
          hasilKerja: new FormControl(''),
          userId: new FormControl(''),

          actDate: new FormControl({value: new Date()},Validators.required),
          butirVolume: new FormControl('', [Validators.required, Validators.min(1)]),
          actNote: new FormControl('', Validators.maxLength(100))
      });
     }

  //error message
  get ErrorMessageAssignLetter() : string{
    const c: FormControl = (this.formInput.get('AssignLetterId') as FormControl);
    return c.hasError('required') ? 'Silakan pilih dari daftar surat, atau buat baru di tab Surat Tugas': '';
  } 
  get ErrorMessageActDate() : string{
    const c: FormControl = (this.formInput.get('actDate') as FormControl);
    return c.hasError('required') ? 'Tanggal pelaksanaan harus diisi': '';
  }    
  get ErrorMessageButirVolume() : string{
    const c: FormControl = (this.formInput.get('butirVolume') as FormControl);
    return c.hasError('required') ? 'Tanggal pelaksanaan harus diisi':
            c.hasError('min') ? 'Jumlah Pekerjaan minimal ' + c.errors.min.min: '';
  }   
ngOnInit() {
  this.getAssignLetterList(); //ambil daftar surat tugas aktif
  this.loadData();
}

getAssignLetterList(){
  //ambil daftar surat tugas yang aktif
  this.assignLetterService.getData<ApiResult<assignLetter>>(0,25,"ltDate","asc","ltActive", "true")
  .subscribe(result => {
    result.data.forEach(d => {
        this.assignLetterService.getFileInfo(d.id).subscribe(r => {
          if (r) {
            d.hasFile = true;
          } else {
            d.hasFile = false;
            result.data.splice(result.data.indexOf(d), 1);
          }
        });
      
    });
    this.surattugas = result['data'];
  });
}    

loadData(){
  if (this.job.id) {
      //edit mode
      this.actService.get<act>(this.job.id).subscribe(result => {
        this.formInput.patchValue(this.job?.Butir ?? result.Butir);
        this.job = result;
          this.setJenjang(this.job.Butir.levelReq);
          this.formInput.patchValue({
            actDate: result.actDate,
            butirVolume: result.butirVolume,
            actNote: result.actNote,
            AssignLetterId: result.AssignLetterId,
            levelReq: this.jenjang
            });
            if (result.actMain) {
              this.actMain = true;
            } else {
              this.actMain = false;
            }
        }, error => console.error(error));
    //eo edit
    } else {
      //input baru
    this.formInput.patchValue(this.job.Butir);
    this.actMain = this.job.actMain;
    this.setJenjang(this.job.Butir.levelReq);
    this.formInput.patchValue({actDate: new Date(), levelReq: this.jenjang});
  }
}

changeButir(main: boolean){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.restoreFocus; true;
  dialogConfig.minWidth = 400;
  dialogConfig.minHeight = 400;
  const utama = main == true ? 1 : 0;
  this.createJob();
  if (this.job) {
    dialogConfig.data = {act: this.job, jenis: utama};
    const dialogRef = this.dialog.open(ButirTreeComponent, dialogConfig);
    this.closeDialog();
  }
}
//create job
createJob() {
  this.job.butirVolume = this.formInput.get('butirVolume').value;
  this.job.actDate = this.formInput.get('actDate').value;
  this.job.actNote = this.formInput.get('actNote').value;
  this.job.AssignLetterId = this.formInput.get('AssignLetterId').value;
  this.job.actMain = this.actMain;
}
  onSubmit(){
    this.createJob();
    //edit mode
    if (this.job.id) {
      this.actService.put<act>(this.job).subscribe(
        result => {
          Swal.fire(result);
          this.closeDialog();
        }, error => Swal.fire({title:error, icon:'error'}));
      } else {
        //create mode
        this.actService.post<act>(this.job).subscribe(
          result => {
            Swal.fire(result);
          }, error => Swal.fire({title:error, icon:'error'}));
        }
  }
  hapusPekerjaan(){
    Swal.fire({
      title: 'Yakin Menghapus entry?',
      text: "Data terhapus akan hilang permanen",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Hapus!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.actService.delete(this.job.id).subscribe(r => Swal.fire({title:r, icon:'success'}));
        this.closeDialog();
      }
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }
  //untuk jenjang dari int ke string
  setJenjang(level:number){
    this.jenjang = '';
    switch (level) {
      case 1:
        this.jenjang =  'Terampil';
        break;
      case 2:
        this.jenjang =  'Mahir';
        break;
      case 3:
        this.jenjang =  'Terampil dan Mahir';
        break;
      case 4:
        this.jenjang =  'Penyelia';
        break;
      case 6:
        this.jenjang =  'Mahir dan Penyelia';
        break;
      case 7:
        this.jenjang =  'Terampil, Mahir, dan Penyelia';
        break;
      default:
        this.jenjang =  'invalid kode';
        break;
    }
  }
}


