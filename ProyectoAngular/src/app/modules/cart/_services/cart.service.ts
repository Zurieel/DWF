import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  // Agregar producto al carrito
  addToCart(product: any) {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = [...currentItems, product];
    this.cartItemsSubject.next(updatedItems);
  }

  // Obtener productos en el carrito
  getCartItems() {
    return this.cartItemsSubject.value;
  }

  // Limpiar el carrito
  clearCart() {
    this.cartItemsSubject.next([]);
  }
}
