import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private firestore: AngularFirestore) {}

 /* saveOrder(checkoutForm: FormGroup, items: any[]): void {
    const orderData = {
      personalData: {
        fullName: checkoutForm.get('fullName').value,
        phone: checkoutForm.get('phone').value,
        email: checkoutForm.get('email').value,
      },
      deliveryData: {
        county: checkoutForm.get('county').value,
        city: checkoutForm.get('city').value,
        ZIP: checkoutForm.get('ZIP').value,
        street: checkoutForm.get('street').value,
        housenum: checkoutForm.get('housenum').value,
        extra: checkoutForm.get('extra').value,
        shippingOption: checkoutForm.get('shippingOption').value
      },
      products: items.map(item => {
        return {
          name: item.name,
          imageUrl: item.imageUrl,
          qty: item.qty,
          price: item.price
        };
      }),
      totalPrice: this.getTotalPrice(items)
    };

    this.firestore.collection('Orders').add(orderData)
      .then(() => console.log('Order saved to Firestore'))
      .catch(error => console.log('Error saving order: ', error));
  }

  getTotalPrice(items: any[]): number {
    return items.reduce((total, item) => total + item.price * item.qty, 0);
  }

  */
}
