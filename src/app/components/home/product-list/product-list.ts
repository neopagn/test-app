import { Component, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { ProductService } from '../../../services/product/product-service';
import { CommonModule, NgFor } from '@angular/common';
import { Tag } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import PaginatorModule, { Paginator } from 'primeng/paginator';
import { PriceFormatPipe } from '../../../pipes/priceFormat-pipe/price-format-pipe';
import { ProductCartService } from '../../../services/product/product-cart-service';
import { Rating } from 'primeng/rating';


@Component({
  selector: 'app-product-list',
  imports: [DataView, NgFor, Tag, ButtonModule, CommonModule, Paginator, PriceFormatPipe,Rating],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProductList {
  products = signal<any>([]);
  productService = inject(ProductService);
  cartService = inject(ProductCartService);
  hoveringProductId = signal<number|null>(null);
  layout = input<'list' | 'grid'>('list');

  first: number = 0;
  rows: number = 5;
  totalRecord = 0;
  onDisplayProduct = signal<any>([]);

  ngOnInit() {
    const data = this.productService.getProduct();
    this.products.set([...data]);
    this.totalRecord = this.products().length;
    if(this.layout()==='list') this.rows=5;
    else this.rows=20;
    this.loadData(this.first, this.rows);
  }
  getSeverity(data: any) {
    switch (data.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warn';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  }

  loadData(first: number, rows: number) {
    const data = this.products();
    this.onDisplayProduct.set([...data.slice(first, first + rows)]);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.loadData(this.first, this.rows);
  }

  addItemToCart(item: any) {
    this.cartService.addItem(item);
  }

  showRating(id:any){
    this.hoveringProductId.set(id);
  }
  hideRating(){
    this.hoveringProductId.set(null);
  }
  
}