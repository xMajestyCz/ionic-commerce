import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  private allProducts: any[] = [];
  private filteredProducts$ = new BehaviorSubject<any[]>([]); 
  productsList$: Observable<any[]> = this.filteredProducts$.asObservable(); 
  categories: string[] = [];
  selectedCategory: string = 'Category';
  cartItemCount: number = 0;

  constructor(private router: Router, private httpService: HttpService, private cartService: CartService) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  sortProducts(order: 'asc' | 'desc') {
    const sortedProducts = [...this.filteredProducts$.getValue()].sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
  
    this.filteredProducts$.next(sortedProducts);
  }

  getProducts() {
    this.httpService.getProductsList().subscribe((data: any[]) => {
      this.allProducts = data;
      this.filteredProducts$.next(data);
    });
  }

  getCategories() {
    this.httpService.getCategories().subscribe((data: string[]) => {
      this.categories = data;
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
  
    if (category === 'Category') {
      this.filteredProducts$.next(this.allProducts); 
    } else {
      const filteredProducts = this.allProducts.filter(product => product.category === category);
      this.filteredProducts$.next(filteredProducts);
    }

    const accordion = document.querySelector('ion-accordion-group') as any;
    if (accordion) {
      accordion.value = '';
    }
  }
  
  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  goToDetail(id: number) {
    this.router.navigate(['/details', id]);
  }
}