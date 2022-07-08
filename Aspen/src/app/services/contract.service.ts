import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService extends BaseService {
  url;
  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
      super(http, baseUrl);
      this.url = baseUrl + 'api/contract/';
    }
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
  get<contract>(id: number): Observable<contract> {
    const myUrl = this.url + id;
    return this.http.get<contract>(myUrl);
  }
  put<contract>(item: any): Observable<any> {
    var myUrl = this.url + item.id;
    return this.http.put<contract>(myUrl, item);
  }
  post<contract>(item: contract): Observable<any> {
    return this.http.post<contract>(this.url, item);
  }
  contractByYear<contract>(year: number): Observable<any> {
    var myUrl = this.url + 'ctrByYear/' + year;
    return this.http.get(myUrl);
  }
  toggleContract<contract>(item:any): Observable<contract> {
    var myUrl = this.url + 'toggle/' + item.id;
    return this.http.put<contract>(myUrl, item);
  }
  getYearList(): Observable<any> {
    var myUrl = this.url + '/yearlist/1';
    return this.http.get(myUrl);
  }
}
