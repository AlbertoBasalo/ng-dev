import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer>
      <nav>
        <a href="https://albertobasalo.dev" target="_blank">© Alberto Basalo</a>
        <a
          href="https://github.com/AlbertoBasalo/ng-dev"
          target="_blank"
          class="secondary">
          <u>🅰️ Angular - Development Course sample</u>
        </a>
        <a [routerLink]="['/labs']">Labs...</a>
      </nav>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
