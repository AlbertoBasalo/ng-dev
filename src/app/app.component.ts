import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer.component';
import { HeaderComponent } from './layout/header.component';
import { ErrorDialog } from './shared/errors/error.dialog';
import { GlobalStore } from './shared/global.store';

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
