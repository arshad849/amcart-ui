import { Component, input, signal, WritableSignal } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-tile',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-tile.component.html',
  styleUrl: './product-tile.component.css'
})
export class ProductTileComponent {

  product = input.required<Product>();

  constructor(private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private productService: ProductService
  ) {}

  navigateToDetail() {
    this.router.navigate(['/product', this.product().productId]);
  }

  addToCart(productId: String) {
     const userId = sessionStorage.getItem('userId');
    if(userId){
      this.cartService.addToCart(userId, productId);
      this.router.navigate(['/cart']);
    }else{
      this.authService.login();
    }
    
  }

  toDetail(product: Product){
    this.productService.setProduct(product);
    this.router.navigate(['/product']);
  }
}
