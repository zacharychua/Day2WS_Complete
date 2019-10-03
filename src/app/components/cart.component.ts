import { Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {SKU} from '../models'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  inventory;
  page;
  nextPage;
  prevPage;
  cart;
  @Input() new_item: SKU;

  constructor() {}
  ngOnInit() {
    this.page = 1;
    this.cart = [];
    this.inventory = this.retrieveInventoryList();
    if(this.page >= Math.ceil(this.cart.length/5)){
      this.nextPage = false;
    }
    else{
      this.nextPage = true;
    }
    this.prevPage = false;
  }

  retrieveInventoryList(){
    return this.cart.slice((this.page - 1) * 5,this.page * 5);
  }

  retrieveNextPage(){
    if(this.page >= Math.ceil(this.cart.length/5)){
      this.nextPage = false;
    }
    else{
      this.page += 1;
      this.prevPage = true;
    }
    this.inventory = this.retrieveInventoryList();
    console.info("Inventory: " + this.inventory.length + " Page: " + this.page);
  }

  retrievePrevPage(){
    if(this.page == 1){
      this.prevPage = false;
    }
    else{
      this.page -= 1;
      this.nextPage = true;
    }
    this.inventory = this.retrieveInventoryList();
    console.info("Inventory: " + this.inventory.length + " Page: " + this.page);
  }

  addToCart(new_item){
    console.info("Item added in cart! " + new_item.productId);
  }

  ngDoCheck() {
    if(this.new_item) this.addToCart(this.new_item);
  }

}
