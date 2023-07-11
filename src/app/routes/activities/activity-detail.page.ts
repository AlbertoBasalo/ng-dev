import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { DataBlock } from 'src/app/shared/ui/data.block';
import { DateBlock } from 'src/app/shared/ui/date.block';
import { LocationBlock } from 'src/app/shared/ui/location.block';
import { PriceBlock } from 'src/app/shared/ui/price.block';
import { ActivityDetailFacade } from './activity-detail.facade';

@Component({
  selector: 'lab-activity-detail',
  standalone: true,
  imports: [CommonModule, DateBlock, PriceBlock, DataBlock, LocationBlock],
  template: `
    <ng-container *ngIf="getActivityStore.isCompleted()">
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
          <button id="book-activity" (click)="onBookClick()">Book</button>
        </footer>
      </article>
    </ng-container>
    <ng-container *ngIf="postBookingStore.isCompleted()">
      <dialog
        id="booked-activity-dialog"
        *ngIf="postBookingStore.result() as booking"
        [open]="postBookingStore.isCompleted()">
        <article>
          <header>
            <a href="#close" aria-label="Close" class="close"></a>
            <h4>Activity Booked</h4>
          </header>
          <p>
            You have booked {{ booking.participants }} ticket on
            {{ booking.date | date }}.
          </p>
        </article>
      </dialog>
    </ng-container>
  `,
  styles: [],
  providers: [ActivityDetailFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ActivityDetailPage implements OnInit {
  #activityDetailFacade: ActivityDetailFacade = inject(ActivityDetailFacade);
  @Input() slug: string | null = null;
  getActivityStore = this.#activityDetailFacade.getActivityStore;
  postBookingStore = this.#activityDetailFacade.postBookingStore;
  description = computed(() =>
    this.#activityDetailFacade.getDescription(this.getActivityStore.result())
  );

  ngOnInit(): void {
    if (this.slug) {
      this.#activityDetailFacade.getActivity(this.slug);
    }
  }
  onBookClick() {
    this.#activityDetailFacade.bookActivity(this.getActivityStore.result());
  }
}
