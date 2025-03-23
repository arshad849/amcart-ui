import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }
  apiUrl = environment.baseApi;

  addToCart(userId: String, productId: String) : Observable<any>{
    const newCartItem: Cart = { userId, productId, quantity:1 };
    console.log('cart service called with userid :'+userId+' and productId : '+productId);
    return this.http.post<any>(`${this.apiUrl}/cart`, newCartItem);
  }

  getCartItemsForUser(userId : String): Observable<any>{
    console.log('cart service called with userid : ',userId);
    return this.http.get<any>(`${this.apiUrl}/cart/${userId}`);
  }
}
