import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems = JSON.parse(localStorage.getItem('cart') || '[]'); // Retrieve items from local storage

  constructor(private cartService : CartService) {}

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCartItem(){
    const user = sessionStorage.getItem('userId')
    if(user){
      // this.cartService.getCartItemsForUser(user).then((items: any)=>{
      //   this.cartItems = items;
      // })
    }
    
  }

  

}
