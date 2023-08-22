import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  Activity,
  DEFAULT_ACTIVITY,
} from '../../shared/domain/models/activity.interface';
import { DateBlock } from '../../shared/ui/date.block';
import { LinkBlock } from '../../shared/ui/link.block';
import { PriceBlock } from '../../shared/ui/price.block';

@Component({
  selector: 'lab-activity-item',
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
export class ActivityItemComponent {
  @Input({ required: true }) activity: Activity = DEFAULT_ACTIVITY;
}
