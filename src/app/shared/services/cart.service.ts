import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems = new BehaviorSubject<any[]>(this.loadCart()); 
    cartItems$ = this.cartItems.asObservable();

    private cartCount = new BehaviorSubject<number>(0);
    cartCount$ = this.cartCount.asObservable();

    private cartTotal = new BehaviorSubject<number>(0);
    cartTotal$ = this.cartTotal.asObservable();

    private loadCart(): any[] {
        return JSON.parse(localStorage.getItem('cartItems') || '[]'); 
    }

    private saveCart(items: any[]) {
        localStorage.setItem('cartItems', JSON.stringify(items)); 
        this.updateTotals(items);
    }
    
    private updateTotals(items: any[]) {
        this.cartCount.next(items.reduce((acc, item) => acc + item.quantity, 0));
        this.cartTotal.next(items.reduce((acc, item) => acc + item.totalPrice, 0));
    }

    addToCart(product: any) {
        let items = this.cartItems.getValue();
        const existingProduct = items.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
            existingProduct.totalPrice = existingProduct.quantity * existingProduct.originalPrice;
        } else {
            product.quantity = 1;
            product.originalPrice = product.price;
            product.totalPrice = product.price;
            items = [...items, product];
        }

        this.cartItems.next([...items]);
        this.saveCart(items); 
    }

    decreaseQuantity(product: any) {
        let items = this.cartItems.getValue();
        const existingProduct = items.find(item => item.id === product.id);

        if (existingProduct) {
            if (existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
                existingProduct.totalPrice = existingProduct.quantity * existingProduct.originalPrice;
            } else {
                items = items.filter(item => item.id !== product.id);
            }
        }

        this.cartItems.next([...items]);
        this.saveCart(items); 
    }

    clearCart() {
        this.cartItems.next([]);
        localStorage.removeItem('cartItems'); 
        this.updateTotals([]);
    }

    getCartItems() {
        return this.cartItems$;
    }
}
