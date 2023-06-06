import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer>
      <nav>
        <a href="https://albertobasalo.dev" target="_blank">© Alberto Basalo</a>
        <a
          href="https://github.com/AlbertoBasalo/ng-dev"
          target="_blank"
          class="secondary"
        >
          <u>🅰️ Angular - Development Course sample</u>
        </a>
      </nav>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
