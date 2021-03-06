import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { chpwd} from '@env/model/user';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  url;
  urlava;
  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
    this.url = baseUrl + 'api/user/';
    this.urlava = baseUrl + 'api/avatar/';
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
  get<user>(id: number): Observable<user> {
    let myUrl = this.url + id;
    return this.http.get<user>(myUrl);
  }
  put<user>(item: any): Observable<user> {
    let myUrl = this.url + item.id;
    return this.http.put<user>(myUrl, item);
  }
  post<user>(item: user): Observable<user> {
    return this.http.post<user>(this.url + 'register', item);
  }
  changePwd(pwd: chpwd): Observable<string> {
    let myUrl = this.url + 'changepassword/' + pwd.id;
    return this.http.post<string>(myUrl, pwd);
  }
  uploadAva(file: File, userId:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', userId);
    const req = new HttpRequest('POST', this.urlava + 'post/', formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
  downImage(id:number): Observable<any> {
    let myUrl = this.urlava + id;
    return this.http.get(myUrl, {responseType: 'blob'});
  }

}
