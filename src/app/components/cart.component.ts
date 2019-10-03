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

  checkPage(){
    if(this.page >= Math.ceil(this.cart.length/5)){
      this.nextPage = false;
    }
    else{
      this.nextPage = true;
    }
    if(this.page === 1){
      this.prevPage = false;
    }
    else{
      this.prevPage = true;
    }
  }

  retrieveInventoryList(){
    console.info(this.cart.slice((this.page - 1) * 5,this.page * 5))
    return this.cart.slice((this.page - 1) * 5,this.page * 5);
  }

  retrieveNextPage(){
    if(this.page < Math.ceil(this.cart.length/5)){
      this.page += 1;
    }
    this.checkPage();
    this.inventory = this.retrieveInventoryList();
    console.info("Inventory: " + this.inventory.length + " Page: " + this.page);
  }

  retrievePrevPage(){
    if(this.page !== 1){
      this.page -= 1;
    }
    this.checkPage();
    this.inventory = this.retrieveInventoryList();
    console.info("Inventory: " + this.inventory.length + " Page: " + this.page);
  }

  addToCart(new_item){
    let isInCart = false;
    for(let item of this.cart){
      if(item.productId == new_item.productId){
        isInCart = true;
        break;
      }
    }
    if(!isInCart){
      this.cart.push(new_item);
      this.inventory = this.retrieveInventoryList();
    }
    console.info("Item added in cart! " + new_item.productId);
    console.info(this.cart);
    console.info(this.inventory);
    this.checkPage();
  }

  removeFromCart(item){
    let index = this.cart.indexOf(item);
    console.info(index);
    this.cart.splice(index, 1);
    this.inventory = this.retrieveInventoryList();
    this.checkPage();
  }

  calculateTotal(){
    let total = 0;
    for(let item of this.cart){
      total += item.productUP;
    }
    return total;
  }

  ngDoCheck() {
    if(this.new_item) {
      this.addToCart(this.new_item);
      this.new_item = null;
    }
  }

}
