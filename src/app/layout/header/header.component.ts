import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lab-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header>
      <h1>{{ title }}</h1>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input({ required: true }) title: string = '';
}
