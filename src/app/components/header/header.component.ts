import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../../services/header.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../services/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatIconModule,
    MatMenuModule,MatDividerModule,
    FormsModule, MatSelectModule, ReactiveFormsModule, MatAutocompleteModule, RouterModule],
  providers: [HeaderService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  searchControl = new FormControl('');
  filteredResults: string[] = [];
  searchQuery: string = '';
  isLoggedIn:boolean = false;
  userDetails: any = null;
  suggestions: any = [];
  categories: any = ['Men', 'Women'];
  selectedCategory: string = '';

  constructor(private headerService: HeaderService,
              private authService: AuthService,
              private productService: ProductService,
              private router: Router
  ) {
    console.log('inside header componenet constructor')
    this.authService.updateAuthStatus();
    this.authService.isLoggedIn$.subscribe((status) => {
      console.log('subscribe : ', status)
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.authService.getUserInfo().then(user => {
          this.userDetails = user;
          console.log('user details : ', this.userDetails);
          console.log(this.userDetails.username);
          sessionStorage.setItem('userId', this.userDetails.username);
          console.log('session user id : ', sessionStorage.getItem('userId'));

        })
        .catch(error => console.error("Error getting user details:", error));
        //this.userDetails = this.authService.getUserInfo();
        
      } else {
        this.userDetails = null;
      }
    });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Wait 300ms after typing
        distinctUntilChanged(), // Avoid duplicate API calls
        filter((query) => query !== null && query.trim() !== ''),
        switchMap((query) => this.headerService.searchProducts(query ?? ''))
      )
      .subscribe(
        (results) => {
          this.filteredResults = results;
        },
        (error) => {
          console.error('Search error:', error);
        }
      );
  }

  onSearch() {
    
    const query = this.searchControl.value?.trim();
    console.log("onSearch is called query : ",query)
    if (query) {
      this.headerService.searchProducts(query).subscribe(
        (results) => {
          console.log('Search results:', results);
          this.productService.setProductSearchResult(results)
          this.router.navigate(['/product-list'])
        },
        (error) => {
          console.error('Search error:', error);
        }
      );
    }
  }

  onSelect(event: any) {
    console.log('Selected product:', event.option.value);
    // Navigate to product details page if needed
  }

  onProfile(){

  }

  onSignIn(){
    
    this.authService.login();
    //this.isLoggedIn=true;
  }

  onRegister(){
    this.authService.register();
  }

  onSignOut(){
    this.authService.logout();
    //this.isLoggedIn=false;
  }

  updateSuggestions() {
    // this.suggestions = this.searchQuery
    //   ? this.products.filter((product) =>
    //       product.toLowerCase().includes(this.searchQuery.toLowerCase())
    //     )
    //   : [];
  }

  selectSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.suggestions = [];
  }

  filterByCategory(category:String){
    console.log('Filtering by category:', category);

  }

  onCategoryChange(event: any) {
    console.log('Selected Category:', event.value);
    this.productService.getProductByCategory(event.value).subscribe(response=>{
      this.productService.setProductSearchResult(response);
      this.router.navigate(["/product-list"]);
    },(error)=>{
      console.error(error)
    })
  }
}
