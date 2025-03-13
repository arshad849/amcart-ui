import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  baseApi = environment.baseApi;
  constructor(private http: HttpClient) {}

  searchProducts(query: string): Observable<any> {
    return this.http.get<any>(`${this.baseApi}/products/search`, { params: { query : query } });
    //console.log(query)
    //return of([query]);
  }

  autoComplete(query: string): Observable<any> {
    return this.http.get<any>(`${this.baseApi}/products/autocomplete`, { params: { prefix : query } });
  }
}
