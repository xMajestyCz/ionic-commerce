import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: false
})
export class CheckoutPage {
  selectedDate: string = '';
  cartTotal: number = 0;

  constructor(private cartService: CartService) {}
  
  ngOnInit() {
    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });
  }
  
  updateDate(event: any) {
    const newDate = new Date(event.detail.value);
    
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear().toString().slice(-2);

    this.selectedDate = `${month}/${year}`;
  }
}
