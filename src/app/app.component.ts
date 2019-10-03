import { Component } from '@angular/core';
import {INVENTORY} from './models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GroceryApp';
  add_item;

  addToCart(item){
    let push_item = {
      productId: item.productId,
      productName: item.productName,
      productImg: item.productImg,
      productUP: item.productUP
    }
    console.info(push_item);
    this.add_item = push_item;
  }
}
