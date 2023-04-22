import { Injectable } from '@angular/core';
import {Product} from "../models/product";
import {BehaviorSubject} from "rxjs";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class FavoritesService {
  items: Product[] = [];
  private storageKey = 'favorites';

  constructor(private authService: AuthenticationService) {
    this.loadFavorites();

    // subscribe to changes in the current user and reload the favorites accordingly
    this.authService.currentUser$.subscribe(user => {
      this.loadFavorites();
    });
  }

  addToFavorites(product: Product) {
    const exist = this.items.find((item) => {
      return item.id === product.id;
    });
    if (!exist) {
      this.items.push(product);
      this.saveFavorites();
    }
  }

  removeFavorite(product: Product) {
    const itemIndex = this.items.findIndex(item => item.id === product.id);
    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1);
      this.saveFavorites();
    }
  }

  getFavorites(): Product[] {
    return this.items;
  }

  private getFavoritesKey(): string {
    const user = this.authService.getCurrentUserValue();
    if (user) {
      return `favorites-${user.uid}`;
    } else {
      return this.storageKey;
    }
  }

  private getFavoritesFromLocalStorage(): Product[] {
    const key = this.getFavoritesKey();
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  }

  private saveFavoritesToLocalStorage() {
    const key = this.getFavoritesKey();
    localStorage.setItem(key, JSON.stringify(this.items));
  }

  private loadFavorites() {
    this.items = this.getFavoritesFromLocalStorage();
  }

  private saveFavorites() {
    this.saveFavoritesToLocalStorage();
  }
}
