import { Component, OnInit } from '@angular/core';
import { ProductTileComponent } from '../product-tile/product-tile.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [ProductTileComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products : any[] = [];
  constructor(private productService: ProductService){

  }
  ngOnInit(): void {
    this.products = this.productService.getProductSearchResult();
  }

  

}
