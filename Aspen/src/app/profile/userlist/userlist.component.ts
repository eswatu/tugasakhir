import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SortDirection, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@env/model';
import { ApiResult, AuthenticationService, UserService } from '@env/services';
import { UserformComponent } from '../userform/userform.component';

@Component({
  selector: 'userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  public displayedColumns;
  public users: MatTableDataSource<User>;

  isAdmin: boolean;
  
  defaultPageIndex: number = 0;
  defaultPageSize: number = 5;
  public defaultSortColumn: string = "id";
  public defaultSortOrder: SortDirection = "asc";

  defaultFilterColumn: string = null;
  filterQuery: string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private userService: UserService,
              private authService: AuthenticationService,
              public dialog: MatDialog) {
                this.authService.user.subscribe(user => this.isAdmin = (user.role === 'Admin') ? true : false);
                this.displayedColumns = ["index", "username", "name", "role", "level", 'aksi'];
              }

  ngOnInit(): void {
    this.loadData(null);
  }
  loadData(q :string = null) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    if (q) { 
      this.filterQuery = q;
    }
    this.getData(pageEvent);
  }
  
  getData(event: PageEvent) { 
    this.users = null;
    var sortColumn = (this.sort) ? this.sort.active : this.defaultSortColumn;
    var sortOrder = (this.sort) ? this.sort.direction : this.defaultSortOrder;
    var filterColumn = (this.filterQuery) ? this.defaultFilterColumn : null;
    var filterQuery = (this.filterQuery) ? this.filterQuery : null;

    //use service
    this.userService.getData<ApiResult<User>>(
      event.pageIndex, event.pageSize,
      sortColumn, sortOrder,
      filterColumn, filterQuery).subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.users = new MatTableDataSource<User>(result.data);
      }, error => console.error(error));
  }
  openForm(id:number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus; true;
    dialogConfig.minWidth = 400;
    dialogConfig.minHeight = 400;
    if (id) {
      dialogConfig.data = {  id: id };
      const dialogRef = this.dialog.open(UserformComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(()=> this.loadData(null));
    } else {
      this.dialog.open(UserformComponent, dialogConfig);
    }
  }
}
