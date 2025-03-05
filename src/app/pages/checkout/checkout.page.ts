import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: false
})
export class CheckoutPage {
  selectedDate: string = '';
  cartTotal: number = 0;

  constructor(
    private cartService: CartService, 
    private router: Router, 
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  formData = {
    name: '',
    lastName: '',
    country: '',
    city: '',
    address: '',
    bankAccount: '',
    cvc: '',
    dueDate: ''
  };

  ngOnInit() {
    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });
  }

  updateDate(event: any) {
    const newDate = new Date(event.detail.value);
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear().toString().slice(-2);

    this.formData.dueDate = `${month}/${year}`;
    setTimeout(() => {
      (document.activeElement as HTMLElement)?.blur();
    }, 0);
  }

  async goToPayment() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 3000,
      cssClass: 'custom-loading'
    });
    const toast = await this.toastController.create({
      message: 'Processing payment...',
      duration: 1000,
      position: 'top',
      cssClass: 'custom-toast'
    });

    await toast.present();
    await loading.present();
  
    setTimeout(() => {
      this.router.navigate(['/payment'], {
        queryParams: this.formData
      });
    }, 3000);
  }
}
