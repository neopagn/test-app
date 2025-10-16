import { Component, inject } from '@angular/core';
import { TableModule} from 'primeng/table';
import { ProductCartService } from '../../../services/product/product-cart-service';
import { AsyncPipe  } from '@angular/common';
import { map } from 'rxjs';
import { PriceFormatPipe } from '../../../pipes/priceFormat-pipe/price-format-pipe';
import { CurrencyPipe } from '../../../pipes/currency-pipe';
import { CapitalizePipe } from '../../../pipes/capitalize-pipe';
import { InputNumber,  } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-shopping-cart',
  imports: [TableModule, AsyncPipe, PriceFormatPipe, CurrencyPipe, CapitalizePipe, InputNumber, FormsModule],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css'
})
export class ShoppingCart {

  private cartService = inject(ProductCartService);
  currentCart$ = this.cartService.currentCart$;

  totalPrice = this.currentCart$.pipe(
    map(items=>{
      return items.reduce((sum, item)=> sum+(item.item.price *item.inCartAmount),0)
    }
    )
  )

  addItemToCart(item:any){
    this.cartService.addItem(item);
  }
  removeItemFromCart(itemID:any){
    this.cartService.removeItem(itemID);
  }
  changeAmountTo(item:any, amount:number){
    this.cartService.changeAmount(item,amount);
  }
}
