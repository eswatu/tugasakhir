import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { BaseService, ApiResult } from "./base.service";
import { Observable } from "rxjs";

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
    sortOrder: 'asc' | 'desc' | '',
    filterColumn: string,
    filterQuery: string): Observable<ApiResult> {
    var url = this.baseUrl + 'Butir';
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
    return this.http.get<ApiResult>(url, { params } );
  }

  getByLevel<butirFull>(level: number,jenis : number): Observable<butirFull[]> {
    var url = this.baseUrl + "api/Butir/jenis/"+ jenis + "/forLevel/" + level;
    return this.http.get<butirFull[]>(url);
  }
  
//nbawah belum dicek
  get<butir>(id: number): Observable<butir> {
    var url = this.baseUrl + "api/Butir/" + id;
    return this.http.get<butir>(url);
  }
  put<butir>(item: any): Observable<butir> {
    var url = this.baseUrl + "api/Butir" + item.id;
    return this.http.put<butir>(url, item);
  }
  post<butir>(item: butir): Observable<butir> {
    var url = this.baseUrl + "api/Butir";
    return this.http.post<butir>(url, item);
  }

}
