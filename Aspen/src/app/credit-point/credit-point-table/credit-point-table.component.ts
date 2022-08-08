import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from "@angular/material/sort";
import { ApiResult, ApiResultWork } from '@env/services/base.service';
import { ActService } from '@env/services/act.service';
import { CreditPointFormComponent } from '../credit-point-form/credit-point-form.component';
import { act } from '@env/model/acts';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';
import { ButirTreeComponent } from '../butir-tree/butir-tree.component';
import Swal from 'sweetalert2';
import { AuthenticationService, UserService } from '@env/services';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { User } from '@env/model';

@Component({
  selector: 'credit-point-table',
  templateUrl: './credit-point-table.component.html',
  styleUrls: ['./credit-point-table.component.css']
})

export class CreditPointTableComponent implements OnInit {
  activeSubmission;

  filtColumn = new FormControl('');
  filterStatus = new FormControl('all');
  filterQ = new FormControl();
  userfilt = new FormControl();

  dateFilter = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  sdate: string = null;
  edate: string = null;

  filterTextChanged: Subject<string> = new Subject<string>();

  public displayedColumns: string[] = ['id', 'Butir.namaButir', 'actDate', 'Butir.jmlPoin','butirVolume', 'actNote', 'aksi'];
  public jobs: MatTableDataSource<act>;
  userList: User[];
  filterId : string;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "actDate";
  public defaultSortOrder: SortDirection = 'desc';

  defaultFilterColumn: string = 'actNote';
  filterQuery: string = null;
  fstatus: string = null;

  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isAdmin;
  user;
   constructor(
    private actService: ActService,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    private userService: UserService) {
      this.authService.user.subscribe(x => {
        this.user = x;
        if (this.user) {
          this.isAdmin = ( x.role === "Penilai") ? true : false ;
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
    this.userService.getData<ApiResult<User>>(0,9999,"name", "asc",null,null).subscribe(result => {
      if (result) {
        this.userList = result.data;
      }
    });    
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;

    if (query) { 
      this.filterQuery = query;
      this.defaultFilterColumn = this.filtColumn.value;
    }
    if (this.dateFilter.value) {
      this.sdate = this.formatDate(this.dateFilter.value['startDate']);
      this.edate = this.formatDate(this.dateFilter.value['endDate']);
    }
    if (this.isAdmin) {
      this.filterId = this.userfilt.value;
    } else {
      this.filterId = this.user.id;
    }
    // let item = this.dateFilter.value['startDate'];
    // console.log(item['_i'])
    this.getData(pageEvent);
  }
  
  getData(event: PageEvent) { 
    this.jobs = null;

    var sortColumn = (this.sort) ? this.sort.active : this.defaultSortColumn;
    var sortOrder = (this.sort) ? this.sort.direction : this.defaultSortOrder;
    var filterColumn = (this.filterQuery) ? this.defaultFilterColumn : null;
    var filterQry = (this.filterQuery) ? this.filterQuery : null;
    //filter status
    var filterS = (this.filterStatus.value) ?? null;
    var filterSDate = (this.sdate) ?? null;
    var filterEDate = (this.edate) ?? null;
    var fId = this.filterId ?? null;
    //use service
    this.actService.getDataS<ApiResultWork<act>>(
      event.pageIndex, event.pageSize,
      sortColumn, sortOrder,
      filterColumn, filterQry,
      filterS, filterSDate, filterEDate, fId).subscribe(result => {
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
  onFilterTextChanged(filterText: string) {
    if (this.filterTextChanged.observers.length === 0) {
        this.filterTextChanged
            .pipe(debounceTime(1000), distinctUntilChanged())
          .subscribe(query => {
            this.jobs = null;
              this.loadData(query);
            });
    }
    this.filterTextChanged.next(filterText);
   }
  
   //helper 
  formatDate(md: any) {
    if (md){
      return [
        ("0" + md['_i'].date).slice(-2),
        ("0" + md['_i'].month).slice(-2),
        md['_i'].year.toString(),
      ].join('-');
    } else {
      return null;
    }
  }
}
