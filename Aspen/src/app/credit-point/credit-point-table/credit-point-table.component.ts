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
import { AuthenticationService } from '@env/services';

@Component({
  selector: 'credit-point-table',
  templateUrl: './credit-point-table.component.html',
  styleUrls: ['./credit-point-table.component.css']
})

export class CreditPointTableComponent implements OnInit {
  activeSubmission;

  public displayedColumns: string[] = ['id', 'Butir.namaButir', 'actDate', 'Butir.jmlPoin','butirVolume', 'actNote', 'aksi'];
  public jobs: MatTableDataSource<act>;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "actDate";
  public defaultSortOrder: SortDirection = 'desc';

  defaultFilterColumn: string = null;
  filterQuery: string = null;

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isAdmin;
  user;
  //  filterTextChanged: Subject<string> = new Subject<string>();
  constructor(
    private actService: ActService,
    private authService: AuthenticationService,
    public dialog: MatDialog) {
      this.authService.user.subscribe(x => {
        this.user = x;
        if (this.user) {
          this.isAdmin = ( x.role === "Admin") ? true : false ;
        }
        if (this.isAdmin){
        this.displayedColumns.push('user');
        }
      });
  }

  ngOnInit(): void {
    this.loadData(null);
    this.paginator._intl.itemsPerPageLabel = "item per halaman";
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
    this.jobs = null;
    var sortColumn = (this.sort) ? this.sort.active : this.defaultSortColumn;
    var sortOrder = (this.sort) ? this.sort.direction : this.defaultSortOrder;
    var filterColumn = (this.filterQuery) ? this.defaultFilterColumn : null;
    var filterQuery = (this.filterQuery) ? this.filterQuery : null;

    //use service
    this.actService.getData<ApiResult<act>>(
      event.pageIndex, event.pageSize,
      sortColumn, sortOrder,
      filterColumn, filterQuery).subscribe(result => {
        result.data.forEach(d => {
          if (d.isProposed == false || !d.isCalculated == false) {
            this.actService.getFileInfo(d.id).subscribe(r => {
              console.log(r);
              if (r.length > 0) {
                d.hasFile = true;
              } else {
                d.hasFile = false;
              }
            });
          }
        });
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
      dialogRef.afterClosed().subscribe(()=> this.loadData(null));
    } else {
      dialogConfig.data = { jenis: jenis };
      this.dialog.open(ButirTreeComponent, dialogConfig);
    }
  }
  
  propose(id:number) {
    Swal.fire({
      title: 'Yakin Mengajukan?',
      text: "Pastikan isian sudah sesuai",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, ajukan!'
    }).then((result) => {
      if (result.isConfirmed) {
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
    })
  }
  viewFile(nomor: Number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus; true;
    dialogConfig.minWidth = 400;
    dialogConfig.minHeight = 400;
    if(nomor) {
      dialogConfig.data = {id: nomor, title: "Laporan Pelaksanaan", mode: "LAP", iseditable: false};
    }
    const dialogRef = this.dialog.open(FileUploadDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(()=> {this.loadData(null)});
  }
  uploadFile(nomor: Number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus; true;
    dialogConfig.minWidth = 400;
    dialogConfig.minHeight = 400;
    if(nomor) {
      dialogConfig.data = {id: nomor, title: "Laporan Pelaksanaan", mode: "LAP", iseditable: true};
    }
    const dialogRef = this.dialog.open(FileUploadDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(()=> {this.loadData(null)});
  }
  
}
