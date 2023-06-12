import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorDialog } from './core/errors/error.dialog';
import { GlobalStore } from './core/global.store';
import { FooterComponent } from './layout/footer.component';
import { HeaderComponent } from './layout/header.component';

@Component({
  selector: 'lab-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ErrorDialog,
  ],
  template: `
    <lab-header [title]="title"></lab-header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
    <lab-footer></lab-footer>
    <lab-error *ngIf="globalStore.handledError() as error" [error]="error" />
  `,
  styles: [],
})
export class AppComponent {
  globalStore = inject(GlobalStore);
  title = '🎫 Activity Bookings';
}
