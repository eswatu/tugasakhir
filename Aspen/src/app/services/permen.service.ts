import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { BaseService, ApiResult } from "./base.service";
import { Observable } from "rxjs";
import { butir } from "../model/permen";
import { inject } from '@angular/core/testing';
import { identifierName } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class PermenService extends BaseService {
  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }
  
  getData<ApiResult>(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortorder: string,
    filterColumn: string,
    filterQuery: string): Observable<ApiResult> {
    var url = this.baseUrl + 'api/Butir';

    return this.http.get<ApiResult>(url, { );
  }
  getList<

  get<creditPoint>(id: number): Observable<creditPoint> {
    var url = this.baseUrl + "api/Butir" + id;
    return this.http.get<creditPoint>(url);
  }
  put<creditPoint>(item: any): Observable<creditPoint> {
    var url = this.baseUrl + "api/Butir" + item.id;
    return this.http.put<creditPoint>(url, item);
  }
  post<creditPoint>(item: creditPoint): Observable<creditPoint> {
    var url = this.baseUrl + "api/Butir";
    return this.http.post<creditPoint>(url, item);
  }

}
