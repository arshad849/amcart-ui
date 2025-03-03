import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  product: any;
  currentImageIndex = 0;

  constructor(private route: Router, private productService: ProductService) {}

  ngOnInit() {
    //const productId = this.route.snapshot.paramMap.get('id');
    //console.log('Product Detail - product id : ',productId)
    //const navigation = this.route.getCurrentNavigation();
    //this.product = navigation?.extras.state?.['product'];
    this.product=this.productService.getProduct();
    console.log('Product : ',this.product)
  }

  nextImage() {
    if (this.product && this.product.images) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
    }
  }

  prevImage() {
    if (this.product && this.product.images) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
    }
  }

}
