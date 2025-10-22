import { Component } from '@angular/core';
import { ProductList } from "../home/product-list/product-list";

@Component({
  selector: 'app-browsing',
  imports: [ProductList],
  templateUrl: './browsing.html',
  styleUrl: './browsing.css'
})
export class Browsing {

}
