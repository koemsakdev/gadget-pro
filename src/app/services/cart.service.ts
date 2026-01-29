// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: any[] = [];
  // BehaviorSubject allows components to "listen" to the count in real-time
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const savedCart = localStorage.getItem('cart');
    this.cartItems = savedCart ? JSON.parse(savedCart) : [];
    this.updateCount();
  }

  addToCart(product: any) {
    const index = this.cartItems.findIndex(item => item.id === product.id);

    if (index > -1) {
      this.cartItems[index].quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.updateCount();
  }

  private updateCount() {
    // Sum of all quantities
    const count = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    this.cartCount.next(count);
  }

  getCount() {
    return this.cartCount.value;
  }
}