import { SortDirection } from '@angular/material/sort';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { User } from '@env/model';
import { ApiResult, AuthenticationService, UserService } from '@env/services';

@Component({
  selector: 'userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  public users: User[];

  isAdmin: boolean;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 5;
  public defaultSortColumn: string = "id";
  public defaultSortOrder :SortDirection = "asc";

  defaultFilterColumn: string = null;
  filterQuery: string = null;
  pagesize;
  pagelength;
  pageindex;
  constructor(private userService: UserService,
              private authService: AuthenticationService) {
                this.authService.user.subscribe(user => {
                  if (user) {
                    this.isAdmin = (user.role === 'Admin') ? true : false;
                  }
                });
              }
  ngOnInit(): void {
    this.loadData(null);
    this.pagesize = 10;
    this.pageindex = 0;
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
     var sortColumn =  this.defaultSortColumn;
     var sortOrder = this.defaultSortOrder;
    var filterColumn = (this.filterQuery) ? this.defaultFilterColumn : null;
    var filterQuery = (this.filterQuery) ? this.filterQuery : null;

    //use service
    this.userService.getData<ApiResult<User>>(
      event.pageIndex, event.pageSize,
      sortColumn, sortOrder,
      filterColumn, filterQuery).subscribe(result => {
        this.pagelength = result.totalCount;
        this.pageindex = result.pageIndex;
         this.pagesize = result.pageSize;
         this.users = result.data;
         console.log(this.users);
      }, error => console.error(error));
  }
  openForm(id:number){

  }
}
