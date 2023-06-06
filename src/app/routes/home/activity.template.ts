import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DateComponent } from 'src/app/shared/date.component';
import { LinkComponent } from 'src/app/shared/link.component';
import { PriceComponent } from 'src/app/shared/price.component';

@Component({
  selector: 'lab-activity',
  standalone: true,
  imports: [CommonModule, LinkComponent, PriceComponent, DateComponent],
  template: `
    <div name="activity-item" [id]="activity.id" class="grid one-two">
      <lab-link name="title" [routerLink]="['/activities', activity.slug]" [caption]="activity.title" />
      <lab-price [price]="activity.price" [currency]="activity.currency" class="right-align" />
      <lab-date [date]="activity.date" class="right-align" />
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityTemplate {
  @Input({ required: true }) activity: any;
}
