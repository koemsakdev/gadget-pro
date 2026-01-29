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

  getCartItems() {
    return this.cartItems;
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveAndRefresh();
  }

  decreaseQuantity(productId: number) {
    const index = this.cartItems.findIndex(item => item.id === productId);
    if (index > -1) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity -= 1;
      } else {
        this.removeFromCart(productId); // Remove if quantity hits 0
      }
      this.saveAndRefresh();
    }
  }

  private saveAndRefresh() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.updateCount();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  getQuantityById(productId: number): number {
    const item = this.cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
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

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart'); // Remove from storage
    this.updateCount(); // This tells the header/badges to reset to 0
  }

  private updateCount() {
    const count = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    this.cartCount.next(count);
  }

  getCount() {
    return this.cartCount.value;
  }
}