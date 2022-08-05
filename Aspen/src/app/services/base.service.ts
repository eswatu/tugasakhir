import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class BaseService { 
    constructor(
        protected http: HttpClient,
        protected baseUrl: string
    ) { }

    abstract getData<ApiResult>(
        pageIndex: number,
        pageSize: number,
        sortColumn: string,
        sortorder: 'asc' | 'desc',
        filterColumn: string,
        filterQuery: string): Observable<ApiResult>;
    
    abstract get<T>(id: number): Observable<T>;
    abstract put<T>(item: T): Observable<T>;
    abstract post<T>(item: T): Observable<T>;
    
}

//interface
export interface ApiResult<T> { 
    data: T[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    sortColumn: string;
    sortOrder: string;
    filterColumn: string;
    filterQuery: string;
}
export interface ApiResultWork<T> { 
    data: T[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    sortColumn: string;
    sortOrder: string;
    filterColumn: string;
    filterQuery: string;
    filterStatus: string;
    filterDateStart: string;
    filterDateEnd: string;
    filterId: string;
}