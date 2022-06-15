import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
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

  allAct;
  allAssignLetter;
  totalValue;

  private dialogRef = null;
  private dialogData;
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
      console.log(this.submission);
    }

  ngOnInit(){
    this.loadAll();
  }
  get isSubmitted(){
    return this.submission.isSubmitted;
  }

  loadAll(){
    this.actService.getBySub(this.submission.id).subscribe(result => {
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
this.subMService.submitSub(this.submission.id).subscribe(res => {
  Swal.fire(res);
}, error => console.error(error));
this.loadAll();
}

}
