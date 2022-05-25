import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { fileInfo } from '@env/model/fileType';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ActService extends BaseService {
  urlFile;
  url;
  getData<ApiResult>(
    pageIndex: number, pageSize: number,
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
  get<act>(id: number): Observable<act> {
    var myUrl = this.url + id;
    return this.http.get<act>(myUrl);
  }
  put<act>(item: any): Observable<act> {
    var myUrl = this.url + item.id;
    return this.http.put<act>(myUrl, item);
  }
  post<act>(item: act): Observable<any> {
    return this.http.post<act>(this.url, item);
  }
  uploadFile(file: File, actId:string, notes: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('actFile', file);
    formData.append('actId', actId);
    formData.append('notes', notes);
    const req = new HttpRequest('POST', this.urlFile + '/post/' + actId, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
  download(id:number): Observable<any> {
    let myurl = this.urlFile + '/' + id;
    return this.http.get(myurl, { responseType: "blob"});
  }
  downloadFile(id: number): Observable<any>{
    const myUrl = this.urlFile + '/' + id; 
    return this.http.get(myUrl,{ responseType: 'blob' as 'json'});
}
  getFileInfo(id:number): Observable<fileInfo> {
    let myUrl = this.urlFile + '/getFileInfo/' + id;
    return this.http.get<fileInfo>(myUrl);
  }

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
    this.url = baseUrl + 'api/acts/';
    this.urlFile = baseUrl + 'api/actfile/';
  }
}
