import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: false
})
export class DetailsPage implements OnInit {
  product: any;
  cartItemCount: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private httpService: HttpService, private cartService: CartService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.httpService.getProductById(id).subscribe(data => {
        this.product = data;
      });
    }

    this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
    
    setTimeout(() => {
      (document.activeElement as HTMLElement)?.blur();
    }, 0);
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
}
