import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseApi = environment.baseApi;
  private selectedProduct : any;
  private searchedProduct : any[]=[];
  private productSearchResult = new BehaviorSubject<any[]>([]);
  productSearchResult$ = this.productSearchResult.asObservable();
  constructor(private http: HttpClient) { }

  private products = [
    {
      productId: 'P001',
      name: 'Classic White Shirt',
      description: 'A stylish and comfortable cotton white shirt for formal and casual wear.',
      price: 29.99,
      category: 'Shirts',
      imageUrl: [
        'https://example.com/shirt1-front.jpg',
        'https://example.com/shirt1-back.jpg'
      ],
      stock: 100,
      rating: 4.5,
      clour: 'White',
      size: ['S', 'M', 'L', 'XL'],
      attributes: {
        material: '100% Cotton',
        fit: 'Regular Fit',
        sleeve: 'Full Sleeve'
      },
      label: 'Best Seller'
    },
    {
      productId: 'P002',
      name: 'Slim Fit Jeans',
      description: 'Denim slim fit jeans for a trendy and stylish look.',
      price: 49.99,
      category: 'Jeans',
      imageUrl: [
        'https://example.com/jeans1-front.jpg',
        'https://example.com/jeans1-back.jpg'
      ],
      stock: 80,
      rating: 4.2,
      clour: 'Blue',
      size: ['28', '30', '32', '34', '36'],
      attributes: {
        material: 'Denim',
        fit: 'Slim Fit',
        wash: 'Medium Wash'
      }
    },
    {
      productId: 'P003',
      name: 'Women’s Summer Dress',
      description: 'A beautiful floral summer dress perfect for casual outings.',
      price: 39.99,
      category: 'Dresses',
      imageUrl: [
        'https://example.com/dress1-front.jpg',
        'https://example.com/dress1-back.jpg'
      ],
      stock: 50,
      rating: 4.8,
      clour: 'Red Floral',
      size: ['XS', 'S', 'M', 'L'],
      attributes: {
        material: 'Chiffon',
        pattern: 'Floral Print',
        sleeve: 'Sleeveless'
      },
      label: 'Trending'
    },
    {
      productId: 'P004',
      name: 'Leather Jacket',
      description: 'A premium black leather jacket for a bold and fashionable look.',
      price: 99.99,
      category: 'Jackets',
      imageUrl: [
        'https://example.com/jacket1-front.jpg',
        'https://example.com/jacket1-back.jpg'
      ],
      stock: 40,
      rating: 4.7,
      clour: 'Black',
      size: ['M', 'L', 'XL'],
      attributes: {
        material: 'Genuine Leather',
        closure: 'Zipper',
        fit: 'Slim Fit'
      },
      label: 'New Arrival'
    },
    {
      productId: 'P005',
      name: 'Sneakers',
      description: 'Comfortable and stylish sneakers for daily wear.',
      price: 59.99,
      category: 'Shoes',
      imageUrl: [
        'https://example.com/sneakers1-front.jpg',
        'https://example.com/sneakers1-side.jpg'
      ],
      stock: 120,
      rating: 4.6,
      clour: 'White',
      size: ['6', '7', '8', '9', '10'],
      attributes: {
        material: 'Synthetic',
        sole: 'Rubber',
        closure: 'Lace-up'
      }
    },
    {
      productId: 'P006',
      name: 'Woolen Scarf',
      description: 'A warm and cozy woolen scarf for winter fashion.',
      price: 19.99,
      category: 'Accessories',
      imageUrl: [
        'https://example.com/scarf1-front.jpg',
        'https://example.com/scarf1-closeup.jpg'
      ],
      stock: 150,
      rating: 4.3,
      clour: 'Gray',
      size: ['One Size'],
      attributes: {
        material: 'Wool',
        pattern: 'Solid',
        season: 'Winter'
      },
      label: 'Best Deal'
    }
  ]

  getProductById(id: string | null) {
    return this.products.find(product => product.productId === id);
  }

  getProductByLabel(label: String|null): Observable<any> {
    return this.http.get<any>(`${this.baseApi}/products/label/${label}`);
  }

  getProductByCategory(category: String|null): Observable<any> {
    return this.http.get<any>(`${this.baseApi}/products/category/${category}`);
  }

  setProduct(product: Product){
    this.selectedProduct = product;
  }

  getProduct(){
    return this.selectedProduct;
  }

  setProductSearchResult(products: Product[]){
    this.searchedProduct = products;
    this.productSearchResult.next(products);
  }

  getProductSearchResult(){
    return this.searchedProduct;
  }
}
