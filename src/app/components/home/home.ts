import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { AsyncPipe } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs';
import { ProductList } from "./product-list/product-list";
import { ShoppingCart } from "./shopping-cart/shopping-cart";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, ProductList, ShoppingCart],
  templateUrl: './home.html',
  styleUrl: './home.css',
  encapsulation:ViewEncapsulation.Emulated,
})
export class Home {
  private auth = inject(AuthService);
  isLoggedin = this.auth.loginStatus$;
  username = this.auth.CurrentUser$.pipe(map(user=>user ? user.firstName : null));
  
  
}
