import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {MessengerService} from "../../services/messenger.service";
import {ProductService} from "../../services/product.service";
import {ProductListComponent} from "../product-list.component";
import {CartService} from "../../services/cart.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  products: Observable<Product[]>;
  @Input() productItem: Product     ///////////////////////////////

  constructor(private ps: ProductService) {

  }

  ngOnInit(){
    this.products = this.ps.getProducts()
  }


}
