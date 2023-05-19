import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lab-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <header>
      <h1>{{ title }}</h1>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer>
      <a href="https://albertobasalo.dev" target="_blank">By Alberto Basalo</a>
    </footer>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Activity Bookings';
}
