import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TradeSC';
  menuItems: MenuItem[];

  constructor() {
    this.menuItems = [
      { label: 'Home', routerLink: '/home' },
      { label: 'Ships', routerLink: '/ships' },
      { label: 'Commodities', routerLink: '/commodities' }
    ];
  }
}
