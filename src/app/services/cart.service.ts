import { Injectable } from '@angular/core';
import {Product} from "../models/product";
import {BehaviorSubject} from "rxjs";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthenticationService} from "./authentication.service";
import { authState} from "@angular/fire/auth";
import { from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  numOfItems = new BehaviorSubject(this.items);
  private storageKey = 'cart';

  constructor(private authService: AuthenticationService) {
    this.loadCart();

    // subscribe to changes in the current user and reload the cart accordingly
    this.authService.currentUser$.subscribe(user => {
      //console.log(user);
      this.loadCart();
    });
  }

  addToCart(product: Product) {
    const exist = this.items.find((item) => {
      return item.id === product.id;
    });
    if (exist) {
      exist.qty++;
    } else {
      this.items.push(product);
      product.qty++;
      this.numOfItems.next(this.items);
    }
    this.saveCart();
  }

  getItems() {
    return this.items;
  }

  incrementItem(product: Product) {
    const itemIndex = this.items.findIndex(item => item.id === product.id);
    if (itemIndex >= 0) {
      this.items[itemIndex].qty++;
      this.numOfItems.next(this.items);
    }
    this.saveCart();
  }

  decrementItem(product: Product) {
    const itemIndex = this.items.findIndex(item => item.id === product.id);
    if (itemIndex >= 0) {
      this.items[itemIndex].qty--;
      if (this.items[itemIndex].qty <= 0) {
        this.items.splice(itemIndex, 1);
      }
      this.numOfItems.next(this.items);
    }
    this.saveCart();
  }

  removeItem(product: Product) {
    const itemIndex = this.items.findIndex(item => item.id === product.id);
    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1);
      this.numOfItems.next(this.items);
    }
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.numOfItems.next(this.items);
    this.saveCart();
  }

  getCartKey(): string {
    const user = this.authService.getCurrentUserValue();
    if (user) {
      return `cart-${user.uid}`;
    } else {
      return this.storageKey;
    }
  }

   getCart(): Product[] {
    const key = this.getCartKey();
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  }

   saveCart() {
    const key = this.getCartKey();
    localStorage.setItem(key, JSON.stringify(this.items));
     console.log(localStorage.getItem(key));
    this.numOfItems.next(this.items);
  }

   loadCart() {
    this.items = this.getCart();
    this.numOfItems.next(this.items);
  }

  setItems(items: Product[]) {
    this.items = items;
    this.saveCart();
  }
}
  /////////////////////////////////////////////////////////////


/*
  userId: string;

  setUserId(userId: string) {
    this.userId = userId;
    this.loadCart();
  }

  private getCartRef() {
    const db = firebase.firestore();
    return db.collection('carts').doc(this.userId);
  }

  private async loadCart() {
    if (this.userId) {
      const cartRef = this.getCartRef();
      const cartData = (await cartRef.get()).data() || {};
      this.items = cartData['items'] || [];
      this.saveCart();
    }
  }

  private async saveCart() {
    if (this.userId) {
      const cartRef = this.getCartRef();
      await cartRef.set({items: this.items});
      this.numOfItems.next(this.items);
    }
  }
*/

