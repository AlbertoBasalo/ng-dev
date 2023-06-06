import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lab-price',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span itemprop="priceCurrency" [attr.content]="currency" class="right-align">
      {{ price | currency : currency : 'symbol' : '1.0-0' }} 🪙
    </span>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceComponent {
  @Input() price: number = 0;
  @Input() currency: string = 'USD';
}
