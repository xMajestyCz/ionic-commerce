import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  isLoading = true;

  constructor() {
    this.showLoading();
  }

  private showLoading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
