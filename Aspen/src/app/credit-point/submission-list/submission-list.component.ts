import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SortDirection, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { submission } from '@env/model/submission';
import { AuthenticationService } from '@env/services';
import { ApiResult } from '@env/services/base.service';
import { SubmissionService } from '@env/services/submission.service';
import { SubmissionFormComponent } from '../submission-form/submission-form.component';

@Component({
  selector: 'submission-list',
  templateUrl: './submission-list.component.html',
  styleUrls: ['./submission-list.component.css']
})
export class SubmissionListComponent implements OnInit {
  user;
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "subDate";
  public defaultSortOrder :SortDirection = "asc";

  defaultFilterColumn: string = null;
  filterQuery: string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //lokal
  submissions;
  adminstatus;
  constructor(private authService: AuthenticationService,
    private subService: SubmissionService,
    public dialog: MatDialog) {
      this.authService.user.subscribe( x => {
        this.user = x;
        this.adminstatus = (x.role === "Admin") ? true : false;
      });
  }

  ngOnInit(): void {
  this.loadData(null);
  }

  loadData(query: string = null){
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    if (query) { 
      this.filterQuery = query;
    }
    this.getData(pageEvent);
  }
  getData(event: PageEvent) {
    let sortColumn = (this.sort) ? this.sort.active : this.defaultSortColumn;
    let sortOrder = (this.sort) ? this.sort.direction : this.defaultSortOrder;
    let filterColumn = (this.filterQuery) ? this.defaultFilterColumn : null;
    let filterQuery = (this.filterQuery) ? this.filterQuery : null;

    //use service
    this.subService.getData<ApiResult<submission>>(
      event.pageIndex, event.pageSize,
      sortColumn, sortOrder,
      filterColumn, filterQuery).subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.submissions = result.data;
      }, error => console.error(error));
  }
  openForm(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus; true;
    dialogConfig.minWidth = 400;
    dialogConfig.minHeight = 400;
        const dialogRef = this.dialog.open(SubmissionFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => this.loadData() );
  }
}
