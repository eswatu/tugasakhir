import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SortDirection, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { submission, User } from '@env/model';
import { ApiResult, ApiResultWork, AuthenticationService, UserService, SubmissionService } from '@env/services';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { SubmissionComponentComponent } from '../submission-component/submission-component.component';

@Component({
  selector: 'valuation-table',
  templateUrl: './valuation-table.component.html',
  styleUrls: ['./valuation-table.component.css']
})

export class ValuationTableComponent implements OnInit {
  isAdmin;

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

  public displayedColumns = ['nomor','subName','subDate','User.name','subNote','subScore'];
  public aspenSubmissions: MatTableDataSource<submission>;

  userList: User[];
  filterId: string;
 
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "subDate";
  public defaultSortOrder: SortDirection = 'desc';

  defaultFilterColumn: string = 'subName';
  filterQuery: string = null;
  fstatus: string = null;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  user;

  constructor(private authService: AuthenticationService,
    private subService: SubmissionService,
    private userService: UserService,
    public dialog: MatDialog) {
      this.authService.user.subscribe(u => {
        if (u){
          this.isAdmin = ( u.role === "Penilai") ? true : false;
          this.user = u;
        }
      })
     }

  ngOnInit(): void {
    this.loadData(null);
    this.paginator._intl.itemsPerPageLabel = "item per halaman";
  }
  loadData(query: string = null) {
    //userservice
    this.userService.getData<ApiResult<User>>(0,999,"name","asc",null,null).subscribe(res => {
      this.userList = res.data.filter((obj)=> {return obj.id != this.user.id});
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
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    this.aspenSubmissions = null;

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
    this.subService.getDataS<ApiResultWork<submission>>(
      event.pageIndex, event.pageSize,
      sortColumn, sortOrder,
      filterColumn, filterQry,
      filterS, filterSDate, filterEDate,fId).subscribe(result => {

        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.aspenSubmissions = new MatTableDataSource<submission>(result.data);

      }, error => console.error(error));
  }
  checkSubmission(sub:submission) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus; true;
    dialogConfig.minWidth = 800;
    dialogConfig.minHeight = 800;

    dialogConfig.data = {sub: sub, target: 100};
    console.log(sub);
    const dialogRef = this.dialog.open(SubmissionComponentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => this.loadData(null) );
    
  }
  onFilterTextChanged(filterText: string) {
    if (this.filterTextChanged.observers.length === 0) {
        this.filterTextChanged
            .pipe(debounceTime(1000), distinctUntilChanged())
          .subscribe(query => {
            this.aspenSubmissions = null;
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
