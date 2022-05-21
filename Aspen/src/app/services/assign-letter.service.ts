import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AssignLetterService extends BaseService{
  url;
  getData<ApiResult>(pageIndex: number, pageSize: number,
    sortColumn: string, sortOrder: 'asc' | 'desc' | '',
    filterColumn: string, filterQuery: string): Observable<ApiResult> {
    var params = new HttpParams()
          .set('pageIndex', pageIndex.toString())
          .set('pageSize', pageSize.toString())
          .set('sortColumn', sortColumn)
          .set('sortOrder', sortOrder);
        if (filterQuery) {
          params = params.set('filterColumn', filterColumn)
                          .set('filterQuery', filterQuery);
        }
        return this.http.get<ApiResult>(this.url, {params});
    }
  get<assignLetter>(id: number): Observable<assignLetter> {
    let myurl = this.url + id;
    return this.http.get<assignLetter>(myurl);
  }
  put<assignLetter>(item: any): Observable<assignLetter> {
    let myurl = this.url + item.id;
    return this.http.put<assignLetter>(myurl, item);
  }
  post<assignLetter>(item: assignLetter): Observable<assignLetter> {
    return this.http.post<assignLetter>(this.url, item);
  }
  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
      super(http, baseUrl);
      this.url = baseUrl + 'api/assignletter/';
     }

}
