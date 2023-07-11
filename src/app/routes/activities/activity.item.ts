import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  Activity,
  ActivityState,
} from 'src/app/shared/models/activity.interface';

import { DataBlock } from 'src/app/shared/ui/data.block';
import { DateBlock } from 'src/app/shared/ui/date.block';
import { LinkBlock } from 'src/app/shared/ui/link.block';
import { LocationBlock } from 'src/app/shared/ui/location.block';
import { PriceBlock } from 'src/app/shared/ui/price.block';
import {
  ACTIVITY_TRANSITIONS,
  ActivityTransition,
} from './activity.transition.interface';

@Component({
  selector: 'lab-activity',
  standalone: true,
  imports: [
    CommonModule,
    DataBlock,
    LinkBlock,
    PriceBlock,
    DateBlock,
    LocationBlock,
  ],
  template: `
    <details name="activity-item" [id]="activity.slug" class="grid two">
      <summary>{{ activity.title }} ({{ activity.state | uppercase }})</summary>
      <article name="details">
        <header>
          <h5>
            <span> For {{ activity.ageCategory }}</span>
            <lab-price
              [price]="activity.price"
              [currency]="activity.currency"
              class="right-align" />
            <lab-date [date]="activity.date" class="right-align" />
          </h5>
          <lab-location
            [location]="activity.location"
            [country]="activity.country"
            [countryCode]="activity.countryCode" />
        </header>
        <main>
          <lab-data
            term="Maximum capacity"
            [data]="activity.capacity + ' places.'"></lab-data>
          <lab-data
            term="Minimum quorum"
            [data]="activity.quorum + ' bookings.'"></lab-data>
          <lab-data
            term="Current reservations"
            [data]="bookingsCount + ' bookings.'"></lab-data>
          <progress
            [value]="getTempValue()"
            [max]="activity.capacity"></progress>
        </main>
        <footer
          *ngIf="['draft', 'published'].includes(activity.state)"
          class="grid three">
          <button
            [name]="'change-state-to-' + button.to"
            *ngFor="let button of getChangeStateButtons()"
            [class]="button.class"
            (click)="changeState.emit(button.to)">
            {{ button.caption }}
          </button>
        </footer>
      </article>
    </details>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityItem {
  @Input({ required: true }) activity!: Activity;
  @Input() bookingsCount: number = 0;
  @Output() changeState = new EventEmitter<ActivityState>();

  getChangeStateButtons(): ActivityTransition[] {
    return ACTIVITY_TRANSITIONS.filter((button) =>
      button.from.includes(this.activity.state)
    );
  }

  getTempValue(): number {
    return Math.floor(Math.random() * this.activity.capacity);
  }
}
