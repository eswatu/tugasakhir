import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { act } from '@env/model/acts';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ActService extends BaseService {

  getData<ApiResult>(
    pageIndex: number, pageSize: number,
    sortColumn: string, sortOrder: 'asc' | 'desc' | '',
    filterColumn: string, filterQuery: string): Observable<ApiResult> {
    var url = this.baseUrl + 'api/Acts';
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
    return this.http.get<ApiResult>(url, {params});
  }
  get<act>(id: number): Observable<act> {
    var url = this.baseUrl + "api/Acts/" + id;
    return this.http.get<act>(url);
  }
  put<act>(item: any): Observable<act> {
    var url = this.baseUrl + "api/Acts" + item.id;
    return this.http.put<act>(url, item);
  }
  post<act>(item: act): Observable<any> {
    var url = this.baseUrl + "api/Acts";
    return this.http.post<act>(url, item);
  }

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }
}
