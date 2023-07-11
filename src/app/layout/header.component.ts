import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalState } from '../shared/global.state';

@Component({
  selector: 'lab-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header role="banner">
      <nav>
        <ul>
          <li>
            <span class="app-title" [routerLink]="['/']">{{ title }}</span>
          </li>
        </ul>
        <ul *ngIf="!isLogged()" id="anonymous-menu">
          <li [routerLink]="['auth', 'sign-up']">
            <a>🔏 Sign up</a>
          </li>
          <!-- <li><a>🔐 Log in</a></li> -->
        </ul>
        <ul *ngIf="isLogged()" id="user-menu">
          <li [routerLink]="['activities', 'mines']">
            <a>➡️ My activities</a>
          </li>
          <li [routerLink]="['activities', 'new']">
            <a>➡️ Create new</a>
          </li>
          <li>
            <a>👤 {{ user().name }}</a>
          </li>
        </ul>
      </nav>
    </header>
  `,
  styles: [
    `
      .app-title {
        font-weight: bold;
        font-size: 1.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input({ required: true }) title: string = '';
  #globalStore = inject(GlobalState);
  isLogged = this.#globalStore.isLogged;
  user = this.#globalStore.user;
}
