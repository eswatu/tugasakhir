import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from "@angular/material/sort";
import { butir } from '@env/model/permen';
import { ApiResult } from '@env/services/base.service';
import { PermenService } from "@env/services/permen.service";

@Component({
  selector: 'app-credit-point-table',
  templateUrl: './credit-point-table.component.html',
  styleUrls: ['./credit-point-table.component.css']
})

export class CreditPointTableComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'namaButir', 'tkButir', 'jmlPoin', 'levelReq'];
  public butirs: MatTableDataSource<butir>;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "id";
  public defaultSortOrder: SortDirection = 'asc';

  defaultFilterColumn: string = null;
  filterQuery: string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //  filterTextChanged: Subject<string> = new Subject<string>();
  constructor(
    private permenService: PermenService) {
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
    this.permenService.getData<ApiResult<butir>>(
      event.pageIndex, event.pageSize,
      sortColumn, sortOrder,
      filterColumn, filterQuery).subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.butirs = new MatTableDataSource<butir>(result.data);
      }, error => console.error(error));
  }

  
}
