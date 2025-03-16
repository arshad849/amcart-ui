import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './auth.gaurd';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] }, 
  { path: 'home', component: HomeComponent },
  {path: 'auth/callback', component: AuthCallbackComponent},
  { path: 'product', component: ProductDetailComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
];
