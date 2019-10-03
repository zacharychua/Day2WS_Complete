import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {INVENTORY, SKU} from '../models'

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventory;
  page;
  nextPage;
  prevPage;
  @Output() onAddToCart = new EventEmitter<SKU>();

  constructor() { }

  ngOnInit() {
    this.page = 1;
    this.inventory = this.retrieveInventoryList();
    if(this.page >= Math.ceil(INVENTORY.length/5)){
      this.nextPage = false;
    }
    else{
      this.nextPage = true;
    }
    this.prevPage = false;
  }

  retrieveInventoryList(){
    return INVENTORY.slice((this.page - 1) * 5,this.page * 5);
  }

  retrieveNextPage(){
    if(this.page >= Math.ceil(INVENTORY.length/5)){
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

  addToCart(item){
    this.onAddToCart.emit(item);
  }
  
}
