import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { act } from '@env/model/acts';
import { butirFull} from '@env/model/permen';
import { ActService } from '@env/services/act.service';
import { AssignLetterService } from '@env/services/assign-letter.service';
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
  formInput : FormGroup;

  //form
  //ini untuk st terpilih
  surattugas;
  id;
  jenjang: string;
  job : act;
        
  constructor(
    private actService: ActService,
    private assignLetterService: AssignLetterService,
    private permenService: PermenService,
    public dialog: MatDialog,
    private dialogRef : MatDialogRef<CreditPointFormComponent>,
     @Inject(MAT_DIALOG_DATA) data){
      //init data
        if(data) {
          if (data.id) {
            this.id = data.id;
          }
          if (data.act) {
            this.job = data.act;
          }
         }
      //init form
    this.formInput = new FormGroup({
          st: new FormControl(''),
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
     }

ngOnInit() {
  this.loadData();
  this.getAssignLetterList();
}

getAssignLetterList(){
  //ambil daftar surat tugas yang aktif
  this.assignLetterService.getData(0,20,"ltDate","asc","ltActive","true")
  .subscribe( result => {
    this.surattugas = result['data'];
  });
}    

loadData(){
  if (this.id) {
    //edit mode
    this.actService.get<act>(this.id).subscribe(result => {
      this.job = result;
      this.formInput.patchValue(this.job.butir);
      this.formInput.patchValue({
        actDate: result.actDate,
        butirVolume: result.butirVolume,
        actNote: result.actNote,
        st: result.AssignLetterId
        });
        console.log(this.job);
      }, error => console.error(error));
    //eo edit
    } else {
      //input baru
      this.formInput.patchValue({st: this.job.AssignLetterId});
    this.formInput.patchValue(this.job);
    this.formInput.patchValue(this.job.butir);
  }

}
changeButir(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.restoreFocus; true;
  dialogConfig.minWidth = 400;
  dialogConfig.minHeight = 400;
  this.createJob();
  if (this.job) {
    dialogConfig.data = {  act: this.job };
    const dialogRef = this.dialog.open(ButirTreeComponent, dialogConfig);
    this.closeDialog();
  }
}
createJob() {
  this.job.butirVolume = this.formInput.get('butirVolume').value;
  //replace ya
  this.job.userId = 1;
  this.job.actDate = this.formInput.get('actDate').value;
  this.job.actNote = this.formInput.get('actNote').value;
  this.job.AssignLetterId = this.formInput.get('st').value;
}
  onSubmit(){
    this.createJob();
    //edit mode
    if (this.id) {
      this.job.id = this.id;
      this.actService.put<act>(this.job).subscribe(
        result => {
          if (result) {
            Swal.fire(result.message);
            }
        }, error => console.error(error));
    } else {
      this.actService.post<act>(this.job).subscribe(
        result => {
          if (result) {
            Swal.fire(result.message);
            }
        }, error => console.error(error));
    }
    this.closeDialog();
  }

  closeDialog(){
    this.dialogRef.close();
  }
  //untuk jenjang dari int ke string
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


