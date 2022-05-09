import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  url;
  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
    this.url = baseUrl + 'api/user/';
  }  
  getData<ApiResult>(pageIndex: number, pageSize: number,
    sortColumn: string, sortorder: 'asc' | 'desc',
    filterColumn: string, filterQuery: string): Observable<ApiResult> {
      var params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("sortColumn", sortColumn)
      .set("sortOrder", sortorder);
    if (filterQuery) { 
      params = params
        .set("filterColumn", filterColumn)
        .set("filterQuery", filterQuery);
    }
    return this.http.get<ApiResult>(this.url, {params});
  }
  get<user>(id: number): Observable<user> {
    let myUrl = this.url + id;
    return this.http.get<user>(myUrl);
  }
  put<user>(item: any): Observable<user> {
    let myUrl = this.url + item.id;
    return this.http.put<user>(myUrl, item);
  }
  post<user>(item: user): Observable<user> {
    return this.http.post<user>(this.url, item);
  }
}
