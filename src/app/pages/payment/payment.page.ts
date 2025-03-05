import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: false
})
export class PaymentPage implements OnInit {
  formData: any = {};
  cartTotal: number = 0;
  
  constructor(private router: Router, private route: ActivatedRoute, private cartService: CartService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.formData = params;
    });
    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });
  }

  goToHome(){
    this.cartService.clearCart(); 
    return this.router.navigate(['/home']);
  }
}
