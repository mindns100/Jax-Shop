import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service'
import { Product } from 'src/app/models/product'
import {filter, Subject, take} from 'rxjs'
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CartService} from "../services/cart.service";
import {ProductService} from "../services/product.service";
import {NavComponent} from "../nav/nav.component";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Product[] = [];

  constructor(private cartService: CartService,
              public authService: AuthenticationService,
              private cdr: ChangeDetectorRef,
              private router: Router) { }

  ngOnInit() {
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    this.cdr.detectChanges(); // manually trigger change detection
  }

  incrementItem(product: Product) {
    this.cartService.incrementItem(product);
  }

  decrementItem(product: Product) {
    this.cartService.decrementItem(product);
  }

  removeItem(product: Product) {
    this.cartService.removeItem(product);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotalPrice(): string {
    let totalPrice = 0;
    for (let item of this.items) {
      totalPrice += item.price * item.qty;
    }
    return totalPrice.toLocaleString('hu-HU', { style: 'currency', currency: 'HUF' });
  }

  redirectToLogin() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/checkout']);
    } else {
      // Redirect to login and pass current URL as query parameter
      this.authService.redirectUrl = '/cart/checkout'; // set the redirectUrl in the auth service
      this.router.navigate(['/login']);

      if (this.items.length === 0) {
        // Load cart items from local storage
        const localCartItems = this.cartService.getCart();
        this.cartService.setItems(localCartItems);
        this.items = this.cartService.getItems();
      }
    }
  }





}
