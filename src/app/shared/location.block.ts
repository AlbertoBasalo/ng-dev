import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lab-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <address [attr.data-tooltip]="country">
      📌 {{ location }} <span class="flag-icon flag-icon-{{ countryCode }}"></span>
    </address>
  `,
  styles: [
    `
      address {
        display: inline;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationBlock {
  @Input() location = '';
  @Input() country = '';
  @Input() countryCode = '';
}
