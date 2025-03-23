import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cartItems:any;

  constructor(private cartService : CartService, private authService: AuthService, private prodService: ProductService) {}
  ngOnInit(): void {
    this.getCartItem();
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCartItem(){
    const user = this.authService.getLoggedInUser()
    if(user){
      this.cartService.getCartItemsForUser(user.userId).subscribe({
        next: (data) => {
          this.prodService.getProductById(data.cartItems[0].productId).subscribe({
            next: (product: any) => {
              this.cartItems = product;
            }
          })
        },
        error: (error) => {
          console.error('Error adding to cart:', error);
        },
      })
    }
    
  }

  

}
