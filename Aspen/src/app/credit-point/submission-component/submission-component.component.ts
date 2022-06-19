import { Component, Injector, Input, OnInit , Output, EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { act } from '@env/model';
import { submission } from '@env/model/submission';
import { ActService } from '@env/services/act.service';
import { SubmissionService } from '@env/services/submission.service';
import Swal from 'sweetalert2';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';
import { SubmissionFormComponent } from '../submission-form/submission-form.component';


@Component({
  selector: 'submission-component',
  templateUrl: './submission-component.component.html',
  styleUrls: ['./submission-component.component.css']
})
export class SubmissionComponentComponent implements OnInit {
  
  @Input() submission: submission;
  @Input() isAdmin: boolean;
  @Input() target: number;
  //untuk ke parent
  @Output() dosubmit = new EventEmitter<boolean>();
  doingsubmit(){
    this.dosubmit.emit(true);
  }
  actlist = [];
  allAct;
  defaultActs;
  allAssignLetter;
  totalValue;
  approveValue = 0;

  private dialogRef = null;
  private dialogData;
  subNote = new FormControl('');

  constructor(private actService: ActService,
    private subMService: SubmissionService,
    private injector: Injector,
    public dialog: MatDialog) {
      this.dialogRef = this.injector.get(MatDialogRef, null);
      this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);

      if (this.dialogData) {
        this.submission = this.dialogData.sub;
        this.target = this.dialogData.target;
        this.isAdmin = true;
      }
  }

  ngOnInit(){
    this.loadAll();
  }
  get isSubmitted(){
    return this.submission.isSubmitted;
  }

  loadAll(){
    this.actService.getBySub(this.submission.id).subscribe(result => {
          result.forEach(item => item['approved'] = false);
          this.defaultActs = result;
          console.log(result);
          this.allAct = this.groupItemBy(result, 'AssignmentLetter.ltNumber');
          this.allAssignLetter = this.getTitle(this.allAct);
          this.totalValue = 0;
          this.allAssignLetter.forEach((item) => {
            this.totalValue += this.getPoinPerAssignLetter(item);
          })
    }, err => console.error(err));
  }

getPoinPerAssignLetter(nama: string){
  const item = this.allAct[nama];
  let score = 0;
  item.forEach((cp) => {
    score+= this.getPoinCredit(cp.Butir.jmlPoin, cp.butirVolume);
  })
  return score;
}
getPoinCredit(numberInput, jmlButir){
    if (numberInput.length > 6) {
       return (parseFloat(numberInput.substring(0,2)) * this.target * 0.01) * jmlButir;
    } else {
      return parseFloat(numberInput) * jmlButir;
    }
  }

groupItemBy(array, property) {
    var hash = {},
        props = property.split('.');
    for (var i = 0; i < array.length; i++) {
        var key = props.reduce(function(acc, prop) {
            return acc && acc[prop];
        }, array[i]);
        if (!hash[key]) hash[key] = [];
        hash[key].push(array[i]);
    }
    return hash;
}
getTitle(obj: Object){
  return Object.keys(obj);
}
edit(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus; true;
    dialogConfig.minWidth = 400;
    dialogConfig.minHeight = 400;
    dialogConfig.data = this.submission.id;
        const dialogRef = this.dialog.open(SubmissionFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => this.loadAll() );
}
lihatFile(nomor: Number){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.restoreFocus; true;
  dialogConfig.minWidth = 400;
  dialogConfig.minHeight = 400;
  if(nomor) {
    dialogConfig.data = {id: nomor, title: "Laporan Pelaksanaan", mode: "LAP"};
  }
  const dialogRef = this.dialog.open(FileUploadDialogComponent, dialogConfig);
}

submitSub(){
  Swal.fire({
    title: 'Konfirmasi Pengajuan?',
    text: `Anda mengajukan ${this.approveValue} dari ${this.defaultActs.length} pekerjaan`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ajukan'
  }).then((result) => {
    if (result.isConfirmed) {
      this.subMService.submitSub(this.submission.id).subscribe(res => {
        Swal.fire(res);
        this.doingsubmit();
        this.loadAll();
      }, error => console.error(error));
    }
  })
}

rejectAct(id:number){
  Swal.fire({
    title: 'Yakin Mengembalikan?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, Kembalikan!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.actService.propose(id).subscribe(() => {
        Swal.fire({
          title: 'Sudah ditolak, muat ulang menu dialog ini.',
          confirmButtonText: 'Okay'
        });
      }, error => console.error(error));
    }
  })
  this.allAct = null;
  this.allAssignLetter = null;
  this.totalValue = null;
  this.loadAll();
}
approve(id) {
  Swal.fire({
    title: 'Yakin terima hasil pekerjaan ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, Terima!'
  }).then((result) => {
    if (result.isConfirmed) {
      const aksi:act = this.defaultActs.find(item => item.id == id);
      this.approveValue += this.getPoinCredit(aksi.Butir.jmlPoin, aksi.butirVolume);
      aksi['approved'] = true;
      this.actlist.push(id);
      console.log(this.actlist);
      this.defaultActs = this.defaultActs.map(obj => {
        if (obj.id == id) {
          return {... obj, approved: true};
        }
        return obj;
      });
    }
  })
  }

approveSubmission() {
  this.submission.subScore = this.approveValue;
  this.submission.subNote = this.subNote.value + ` dan diterima act nomor ${this.actlist}`;
  Swal.fire({
    title: 'Konfirmasi Penilaian',
    text: `Anda Menerima ${this.approveValue} dari ${this.defaultActs.length} pekerjaan`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Terima Nilai'
  }).then((result) => {
    if (result.isConfirmed) {
      this.subMService.approveSub(this.submission).subscribe(res => {
        Swal.fire(res);
      }, error => Swal.fire(error));
    }
  })
}

}
