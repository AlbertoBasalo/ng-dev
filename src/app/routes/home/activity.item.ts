import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Activity, DEFAULT_ACTIVITY } from 'src/app/core/activity.interface';
import { DateBlock } from 'src/app/shared/date.block';
import { LinkBlock } from 'src/app/shared/link.block';
import { PriceBlock } from 'src/app/shared/price.block';

@Component({
  selector: 'lab-activity',
  standalone: true,
  imports: [CommonModule, LinkBlock, PriceBlock, DateBlock],
  template: `
    <div name="activity-item" [id]="activity.slug" class="grid one-two">
      <lab-link
        name="title"
        [routerLink]="['/activities', activity.slug]"
        [caption]="activity.title" />
      <lab-price
        [price]="activity.price"
        [currency]="activity.currency"
        class="right-align" />
      <lab-date [date]="activity.date" class="right-align" />
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityItem {
  @Input({ required: true }) activity: Activity = DEFAULT_ACTIVITY;
}
