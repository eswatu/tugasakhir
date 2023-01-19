import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css']
})
class HelpDialogComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private dialogRef: MatDialogRef<HelpDialogComponent>) { }

  ngOnInit(): void {
  }

}
