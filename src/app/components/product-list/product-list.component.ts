import { Component, OnInit } from '@angular/core';
import { ProductTileComponent } from '../product-tile/product-tile.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [ProductTileComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products : any[] = [];
  constructor(private productService: ProductService,
    private router: Router,
  ){

  }
  ngOnInit(): void {
    //this.products = this.productService.getProductSearchResult();

    this.productService.productSearchResult$.subscribe(products => {
      this.products = products;
    });
  }

  

}
