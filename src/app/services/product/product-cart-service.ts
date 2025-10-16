import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../types/product';

interface CartItemType {
  item: Product;
  inCartAmount: number ;
}

@Injectable({
  providedIn: 'root',
})
export class ProductCartService {
  private cartItems = new BehaviorSubject<CartItemType[]>([]);

  public currentCart$ = this.cartItems.asObservable();

  addItem(item: any) {
    let currentCartItems = this.cartItems.getValue();
    const currentItem = currentCartItems.find((i) => i.item.id === item.id);
    if(currentItem?.inCartAmount===999) return;
    if (currentItem) currentItem.inCartAmount += 1;
    else currentCartItems.push({ item: item, inCartAmount: 1 });
    this.cartItems.next(currentCartItems);

    // console.log(`added item: ${item}`)
  }

  removeItem(ItemId: any) {
    let currentCartItems = this.cartItems.getValue();
    
      
      currentCartItems = currentCartItems.filter((item) => item.item.id !== ItemId);
    this.cartItems.next(currentCartItems);
  }

  changeAmount(item:any, amount:number){
    let currentCartItems = this.cartItems.getValue();

    if (amount === 0) {
        currentCartItems = currentCartItems.filter((i) => i.item.id !== item.item.id);
    } 
    else if (amount > 0) {
        const itemToUpdate = currentCartItems.find((i) => i.item.id === item.item.id);
        
        if (itemToUpdate) {
            itemToUpdate.inCartAmount = amount;
        } 
    }

    this.cartItems.next(currentCartItems);
  }
}
