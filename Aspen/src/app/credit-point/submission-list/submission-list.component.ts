import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SortDirection, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { submission } from '@env/model/submission';
import { ApiResult } from '@env/services/base.service';
import { SubmissionService } from '@env/services/submission.service';

@Component({
  selector: 'submission-list',
  templateUrl: './submission-list.component.html',
  styleUrls: ['./submission-list.component.css']
})
export class SubmissionListComponent implements OnInit {
  //tabel
  public displayedColumns: string[] = ['nomor', 'subName', 'subDate', 'subNote'];
  public jobs: MatTableDataSource<submission>;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "subDate";
  public defaultSortOrder: SortDirection = 'act';

  defaultFilterColumn: string = null;
  filterQuery: string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //lokal
  submissions;

  constructor(private subService: SubmissionService) {
    
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
        this.submissions = new MatTableDataSource<submission>(result.data);
      }, error => console.error(error));
  }
}
