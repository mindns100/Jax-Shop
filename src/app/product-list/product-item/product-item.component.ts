import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
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
