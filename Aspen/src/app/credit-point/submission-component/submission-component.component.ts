import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { submission } from '@env/model/submission';
import { ActService } from '@env/services/act.service';
import { SubmissionService } from '@env/services/submission.service';
import { SubmissionFormComponent } from '../submission-form/submission-form.component';

@Component({
  selector: 'submission-component',
  templateUrl: './submission-component.component.html',
  styleUrls: ['./submission-component.component.css']
})
export class SubmissionComponentComponent implements OnInit {
  
  @Input() submission: submission;
  @Input() isAdmin: boolean;

  allAct;
  allAssignLetter;
  constructor(private actService: ActService,
    private subMService: SubmissionService,
    public dialog: MatDialog) { }

  ngOnInit(){
    this.loadAll();
  }
  loadAll(){
    this.actService.getBySub(this.submission.id).subscribe(result => {
          this.allAct = this.groupItemBy(result, 'AssignmentLetter.ltNumber');
          this.allAssignLetter = this.getTitle(this.allAct);
          console.log(result);
    }, err => console.error(err));
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


}
