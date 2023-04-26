import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {CartComponent} from "../cart/cart.component";
import {CartService} from "../services/cart.service";
import {Product} from "../models/product";
import firebase from "firebase/compat/app";
import { User } from 'firebase/auth';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  savedOrders: any[] = [];

  items: Product[] = [];
  loggedInUser: User | null = null;


  checkoutForm: FormGroup;



  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              public cart: CartComponent,
              private cartService: CartService

              ) {


    this.authService.currentUser$.subscribe(user => this.loggedInUser = user);

    this.checkoutForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      county: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      extra: ['', Validators.required],
      shippingOption: ['standard', Validators.required]
    });
  }



  createOrder(items, checkoutForm) {
    const db = firebase.firestore();
    const orderRef = db.collection('orders').doc();
    const totalPrice = this.getTotalPrice();
    const orderData = {
      orderId: orderRef.id,
      createdAt: new Date().toString(),
      products: items.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        totalPrice: item.price * item.qty,
      })),
      customer: {
        fullName: checkoutForm.get('fullName')?.value,
        phone: checkoutForm.get('phone')?.value,
        email: checkoutForm.get('email')?.value,
        address: {
          county: checkoutForm.get('county')?.value,
          city: checkoutForm.get('city')?.value || '',
          zip: checkoutForm.get('zip')?.value,
          street: checkoutForm.get('street')?.value,
          houseNumber: checkoutForm.get('houseNumber')?.value,
          extra: checkoutForm.get('extra')?.value,
        },
      },
      shippingOption: checkoutForm.get('shippingOption')?.value,
      totalPrice,
      account: {
        ID:'',
        email:''
      }
    };
    if (this.loggedInUser) {
      //orderData.account = [this.loggedInUser!.displayName!, this.loggedInUser!.email!];
      orderData.account.ID = this.loggedInUser!.uid!;
      orderData.account.email = this.loggedInUser!.email!;
    } else {
      //orderData.account = ['guest', 'N/A'];
      orderData.account.ID = 'quest';
      orderData.account.email = 'N/A';
    }

    const savedCheckoutForm = checkoutForm.value;
    this.savedOrders.push(savedCheckoutForm);

    return orderRef.set(orderData)
      .then(() => {
        console.log("ORDER SAVED!");
        window.alert("Sikeres Rendelés!" +
          "A rendelésedet rögzítettük, és hamarosan feldolgozásra kerül.");
        this.router.navigate(['/account']);
      });


  }

  onSubmit() {
    const selectedForm = this.checkoutForm.value;
    if (this.savedOrders.indexOf(selectedForm) === -1) {
      this.savedOrders.push(selectedForm);
    }

  }
  populateForm(selectedForm) {
    this.checkoutForm.patchValue(selectedForm);
  }

  ngOnInit() {

    this.items = this.cartService.getItems();
    this.authService.currentUser$.subscribe((user) => {
      this.loggedInUser = user;
      if (this.checkoutForm) {
        const emailControl = this.checkoutForm.get('email');
        if (emailControl) {
          emailControl.setValue(this.loggedInUser?.email || '');
        }
      }
    });


  }




  clearCart() {
    this.cartService.clearCart();
  }

  getShippingCost(): number {
    const shippingOption = this.checkoutForm.get('shippingOption')?.value;
    if (shippingOption === 'express') {
      return 1500;
    } else if (shippingOption === 'standard') {
      return 1100;
    } else {
      return 0;
    }
  }


  getTotalPrice(): string {
    let totalPrice = 0;
    for (let item of this.items) {
      totalPrice += (item.price * item.qty);
    }
    const shippingCost = this.getShippingCost();
    totalPrice += shippingCost;
    return totalPrice.toLocaleString('hu-HU', { style: 'currency', currency: 'HUF' });
  }

}
