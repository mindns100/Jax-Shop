import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {


  constructor() { }

  ngOnInit(){

  }

}
