import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  cartTotal: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });
  }

  increaseQuantity(product: any) {
    this.cartService.addToCart(product);
  }
  decreaseQuantity(product: any) {
    this.cartService.decreaseQuantity(product);
  }
  goToCheckout(){
    this.router.navigate(['/checkout']);
  }
}