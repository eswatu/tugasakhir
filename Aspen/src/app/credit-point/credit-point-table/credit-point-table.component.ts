import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from "@angular/material/sort";
import { ApiResult } from '@env/services/base.service';
import { ActService } from '@env/services/act.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreditPointFormComponent } from '../credit-point-form/credit-point-form.component';
import { act } from '@env/model/acts';
import { butirFull } from '@env/model/permen';

@Component({
  selector: 'app-credit-point-table',
  templateUrl: './credit-point-table.component.html',
  styleUrls: ['./credit-point-table.component.css']
})

export class CreditPointTableComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'namaButir', 'actDate', 'jmlPoin', 'butirVolume', 'actNote', 'aksi'];
  public jobs: MatTableDataSource<act>;

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
  openForm(acts:act){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus; true;
    dialogConfig.minWidth = 400;
    dialogConfig.minHeight = 400;
    if (acts) {
      dialogConfig.data = {  actId: acts.id, butirId: acts.butir.id };
    }
    const dialogRef = this.dialog.open(CreditPointFormComponent, dialogConfig);
    //dialogRef.afterClosed().subscribe(result )
  }

  
}
