import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY, of } from 'rxjs';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) {}

  searchProducts(query: string): Observable<any> {
    this.http.get<any>(`${config.baseApi}/products/search`, { params: { q: query } });
    console.log(query)
    return of([query]);
  }
}
