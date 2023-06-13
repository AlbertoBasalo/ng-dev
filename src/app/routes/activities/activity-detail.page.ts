import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { DataBlock } from 'src/app/shared/data.block';
import { DateBlock } from 'src/app/shared/date.block';
import { LocationBlock } from 'src/app/shared/location.block';
import { PriceBlock } from 'src/app/shared/price.block';
import { ActivityDetailFacade } from './activity-detail.facade';

@Component({
  selector: 'lab-activity-detail',
  standalone: true,
  imports: [CommonModule, DateBlock, PriceBlock, DataBlock, LocationBlock],
  template: `
    <article *ngIf="getActivityStore.result() as activity" [attr.name]="slug">
      <header class="headings">
        <h1>{{ activity.title }}</h1>
        <p>
          <lab-location
            [location]="activity.location"
            [country]="activity.country"
            [countryCode]="activity.countryCode" />
          <lab-date [date]="activity.date" />
        </p>
      </header>
      <main>
        <blockquote [innerHtml]="description()"></blockquote>
        <lab-data
          term="Maximum capacity"
          [data]="activity.capacity + ' places.'"></lab-data>
        <lab-data
          term="Minimum quorum"
          [data]="activity.quorum + ' bookings.'"></lab-data>
        <p
          >Pricing
          <lab-price [price]="activity.price" [currency]="activity.currency"
        /></p>
        <p>Suitable for {{ activity.ageCategory }}</p>
      </main>
      <footer>
        <button>Book</button>
      </footer>
    </article>
  `,
  styles: [],
  providers: [ActivityDetailFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ActivityDetailPage implements OnInit {
  @Input() slug: string | null = null;
  #activityDetailFacade: ActivityDetailFacade = inject(ActivityDetailFacade);
  getActivityStore = this.#activityDetailFacade.getActivityStore;
  description = computed(() =>
    this.#activityDetailFacade.getDescription(this.getActivityStore.result())
  );

  ngOnInit(): void {
    if (this.slug) {
      this.#activityDetailFacade.getActivity(this.slug);
    }
  }
}
