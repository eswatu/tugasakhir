import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from "@angular/material/sort";
import { ApiResult } from '@env/services/base.service';
import { ActService } from '@env/services/act.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreditPointFormComponent } from '../credit-point-form/credit-point-form.component';
import { act } from '@env/model/acts';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';
import { ButirTreeComponent } from '../butir-tree/butir-tree.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'credit-point-table',
  templateUrl: './credit-point-table.component.html',
  styleUrls: ['./credit-point-table.component.css']
})

export class CreditPointTableComponent implements OnInit {
  
  public displayedColumns: string[] = ['id', 'Butir.namaButir', 'actDate', 'Butir.jmlPoin', 'butirVolume', 'actNote', 'aksi'];
  public jobs: MatTableDataSource<act>;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "actDate";
  public defaultSortOrder: SortDirection = 'desc';

  defaultFilterColumn: string = null;
  filterQuery: string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //  filterTextChanged: Subject<string> = new Subject<string>();
  constructor(
    private actService: ActService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadData(null);
  }
  loadData(query: string = null) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    if (query) { 
      this.filterQuery = query;
    }
    this.getData(pageEvent);
  }

  getData(event: PageEvent) { 
    var sortColumn = (this.sort) ? this.sort.active : this.defaultSortColumn;
    var sortOrder = (this.sort) ? this.sort.direction : this.defaultSortOrder;
    var filterColumn = (this.filterQuery) ? this.defaultFilterColumn : null;
    var filterQuery = (this.filterQuery) ? this.filterQuery : null;

    //use service
    this.actService.getData<ApiResult<act>>(
      event.pageIndex, event.pageSize,
      sortColumn, sortOrder,
      filterColumn, filterQuery).subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.jobs = new MatTableDataSource<act>(result.data);
      }, error => console.error(error));
  }
  
  openForm(job:act, jenis: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus; true;
    dialogConfig.minWidth = 400;
    dialogConfig.minHeight = 400;
    if (job) {
      dialogConfig.data = {  id: job.id, jenis: jenis };
      const dialogRef = this.dialog.open(CreditPointFormComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(() => this.loadData(null) );
    } else {
      dialogConfig.data = { jenis: jenis };
      const dialogRef = this.dialog.open(ButirTreeComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(() => this.loadData(null) );
    }
  }
  propose(id:number) {
    this.actService.propose(id).subscribe(result => {
      Swal.fire({
        title: result,
        confirmButtonText: 'Okay'
      }).then((result)=> {
        if (result.isConfirmed) {
          this.loadData(null);
        }
      });
    }, error => console.error(error));
  }

  uploadFile(nomor: Number){
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
  
}
