import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lab-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header>
      <nav>
        <h1 [routerLink]="['/']">{{ title }}</h1>
        <ul>
          <li [routerLink]="['auth', 'sign-up']"><a>🔏 Sign up</a></li>
          <!-- <li><a>🔐 Log in</a></li> -->
        </ul>
      </nav>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input({ required: true }) title: string = '';
}
