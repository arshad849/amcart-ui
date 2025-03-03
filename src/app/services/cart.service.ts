import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(userId: String, productId: String){
    console.log('cart service called with userid :'+userId+' and productId : '+productId);

  }

  getCartItemsForUser(userId : String){
    console.log('cart service called with userid : ',userId);
  }
}
