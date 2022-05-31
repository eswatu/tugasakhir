import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { assignLetter } from '@env/model/acts';
import { AssignLetterService } from '@env/services/assign-letter.service';
import { ApiResult } from '@env/services/base.service';
import { AssignLetterFormComponent } from '../assign-letter-form/assign-letter-form.component';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';

@Component({
  selector: 'assign-letter-table',
  templateUrl: './assign-letter-table.component.html',
  styleUrls: ['./assign-letter-table.component.css']
})
export class AssignLetterTableComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'ltNumber', 'ltDate', 'ltDateStart', 'ltDateEnd', 'ltShare', 'ltActive', 'ltNote', 'aksi'];
  public asgnLtrs: MatTableDataSource<assignLetter>;


  defaultPageIndex: number = 0;
  defaultPageSize: number = 5;
  public defaultSortColumn: string = "id";
  public defaultSortOrder: SortDirection = "asc";

  defaultFilterColumn: string = null;
  filterQuery: string = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private alService:AssignLetterService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData(null);
  }
  loadData(q: string = null) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    if (q) { 
      this.filterQuery = q;
    }
    this.getData(pageEvent);
  }
  getData(event: PageEvent) { 
    var sortColumn = (this.sort) ? this.sort.active : this.defaultSortColumn;
    var sortOrder = (this.sort) ? this.sort.direction : this.defaultSortOrder;
    var filterColumn = (this.filterQuery) ? this.defaultFilterColumn : null;
    var filterQuery = (this.filterQuery) ? this.filterQuery : null;

    //use service
    this.alService.getData<ApiResult<assignLetter>>(
      event.pageIndex, event.pageSize,
      sortColumn, sortOrder,
      filterColumn, filterQuery).subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.asgnLtrs = new MatTableDataSource<assignLetter>(result.data);
      }, error => console.error(error));
  }
  openForm(al:assignLetter){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus; true;
    dialogConfig.minWidth = 400;
    dialogConfig.minHeight = 400;
    if (al) {
      dialogConfig.data = {  id: al.id};
    }
    const dialogRef = this.dialog.open(AssignLetterFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => this.loadData() );
  }
  uploadFile(nomor: Number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus; true;
    dialogConfig.minWidth = 400;
    dialogConfig.minHeight = 400;
    if(nomor) {
      dialogConfig.data = {id: nomor, title: "Surat Tugas", mode: "ST"};
    }
    const dialogRef = this.dialog.open(FileUploadDialogComponent, dialogConfig);
  }
}
