import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SortDirection, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { contract } from '@env/model';
import { ApiResult } from '@env/services';
import { ContractService } from '@env/services/contract.service';
import { ContractFormComponent } from '../contract-form/contract-form.component';

@Component({
  selector: 'contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  public displayedColumns: string[];
  public contracts: MatTableDataSource<contract>;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "contractYear";
  public defaultSortOrder: SortDirection = 'desc';

  defaultFilterColumn: string = null;
  filterQuery: string = null;

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private contractService: ContractService,
    public dialog: MatDialog) {
      this.displayedColumns = ['id', 'contractName','contractDate','contractYear', 'contractValue','isActive', 'contractNote', 'aksi'];
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
    this.contracts = null;
    var sortColumn = (this.sort) ? this.sort.active : this.defaultSortColumn;
    var sortOrder = (this.sort) ? this.sort.direction : this.defaultSortOrder;
    var filterColumn = (this.filterQuery) ? this.defaultFilterColumn : null;
    var filterQuery = (this.filterQuery) ? this.filterQuery : null;

    //use service
    this.contractService.getData<ApiResult<contract>>(
      event.pageIndex, event.pageSize,
      sortColumn, sortOrder,
      filterColumn, filterQuery).subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.contracts = new MatTableDataSource<contract>(result.data);

      }, error => console.error(error));
  }
  openForm(nomor: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus; true;
    dialogConfig.minWidth = 400;
    dialogConfig.minHeight = 400;
    if (nomor) {
      dialogConfig.data = {  id: nomor};
    }
    const dialogRef = this.dialog.open(ContractFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => this.loadData(null) );
  }

}
