import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SortDirection, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { act, submission } from '@env/model';
import { ActService, ApiResult, AuthenticationService } from '@env/services';
import { SubmissionService } from '@env/services/submission.service';
import { SubmissionComponentComponent } from '../submission-component/submission-component.component';

@Component({
  selector: 'valuation-table',
  templateUrl: './valuation-table.component.html',
  styleUrls: ['./valuation-table.component.css']
})
export class ValuationTableComponent implements OnInit {
  isAdmin;

  public displayedColumns = ['nomor','subName','subDate','subOwner','subNote','subScore'];
  public aspenSubmissions: MatTableDataSource<submission>;
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "subDate";
  public defaultSortOrder: SortDirection = 'desc';
  defaultFilterColumn: string = null;
  filterQuery: string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthenticationService,
    private subService: SubmissionService,
    private actService: ActService,
    public dialog: MatDialog) {
      this.authService.user.subscribe(u => {
        this.isAdmin = ( u.role === "Admin") ? true : false;
      })
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
    this.subService.getData<ApiResult<submission>>(
      event.pageIndex, event.pageSize,
      sortColumn, sortOrder,
      filterColumn, filterQuery).subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.aspenSubmissions = new MatTableDataSource<submission>(result.data);
        console.log(result);
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

}
