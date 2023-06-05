import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'lab-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <lab-header [title]="title"></lab-header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
    <lab-footer></lab-footer>
  `,
  styles: [],
})
export class AppComponent {
  title = '🎫 Activity Bookings';
}
