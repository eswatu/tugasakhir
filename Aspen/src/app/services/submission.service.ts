import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { submission } from '@env/model';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService extends BaseService {
  url;

  getData<ApiResult>(pageIndex: number, pageSize: number,
    sortColumn: string, sortOrder: 'asc' | 'desc' | '',
    filterColumn: string, filterQuery: string): Observable<ApiResult> {
      var params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("sortColumn", sortColumn)
      .set("sortOrder", sortOrder);
    if (filterQuery) { 
      params = params
        .set("filterColumn", filterColumn)
        .set("filterQuery", filterQuery);
    }
    return this.http.get<ApiResult>(this.url, {params});
  }

  get<submission>(id: number): Observable<submission> {
    const myUrl = this.url + id;
    return this.http.get<submission>(myUrl);
  }
  put<submission>(item: any): Observable<any> {
    var myUrl = this.url + item.id;
    return this.http.put<submission>(myUrl, item);
  }
  post<submission>(item: any): Observable<any> {
    return this.http.post<submission>(this.url, item);
  }
  submitSub(id: number): Observable<any> {
    var myUrl = this.url + 'submit/' + id;
    return this.http.post(myUrl,null);
  }
  approveSub<submission>(item: any): Observable<any>{
    var myUrl = this.url + 'approve/' + item.id;
    return this.http.put<submission>(myUrl, item);
  }
  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
      super(http, baseUrl);
      this.url = baseUrl + 'api/subm/';
     }
     getDataS<ApiResultWork>(
      pageIndex: number, pageSize: number,
      sortColumn: string, sortOrder: 'asc' | 'desc' | '',
      filterColumn: string, filterQuery: string,
      filterStatus: string, filterSDate: string, filterEDate:string, filterId:string): Observable<ApiResultWork> {
      var params = new HttpParams()
        .set("pageIndex", pageIndex.toString())
        .set("pageSize", pageSize.toString())
        .set("sortColumn", sortColumn)
        .set("sortOrder", sortOrder)
        .set("filterStatus", filterStatus)
        .set("filterSDate", filterSDate)
        .set("filterEDate",filterEDate)
        .set("filterId",filterId);
      if (filterQuery) { 
        params = params
          .set("filterColumn", filterColumn)
          .set("filterQuery", filterQuery);
      }
      return this.http.get<ApiResultWork>(this.url, {params});
    }
}
