import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import { User } from '../../../types/user';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CurrencyPipe } from '../../../pipes/currency-pipe';
import { CapitalizePipe } from '../../../pipes/capitalize-pipe';
import { ProductList } from '../../home/product-list/product-list';
import {InputTextModule} from 'primeng/inputtext'
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { PriceFormatPipe } from '../../../pipes/priceFormat-pipe/price-format-pipe';
import { ShoppingCart } from "../../home/shopping-cart/shopping-cart";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-info',
  imports: [AsyncPipe, CurrencyPipe, CapitalizePipe, InputTextModule, FloatLabel, FormsModule, PriceFormatPipe, ShoppingCart, RouterModule],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo {
  private auth = inject(AuthService);
  userInfo$ = this.auth.CurrentUser$.pipe(map((user) => (user ? user : null)));
  currency:number = 200000000001;
}
