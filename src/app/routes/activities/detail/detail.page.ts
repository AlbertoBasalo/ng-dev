import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, computed, inject } from '@angular/core';
import { DataComponent } from 'src/app/shared/data.component';
import { DateComponent } from 'src/app/shared/date.component';
import { LocationBlock } from 'src/app/shared/location.block';
import { PriceComponent } from 'src/app/shared/price.component';
import { DetailFacade } from './detail.facade';

@Component({
  selector: 'lab-detail',
  standalone: true,
  imports: [CommonModule, DateComponent, PriceComponent, DataComponent, LocationBlock],
  template: `
    <article *ngIf="getActivity.result() as activity" [attr.name]="slug">
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
        <lab-data term="Maximum capacity" [data]="activity.capacity + ' places.'"></lab-data>
        <lab-data term="Minimum quorum" [data]="activity.quorum + ' bookings.'"></lab-data>
        <p>Pricing <lab-price [price]="activity.price" [currency]="activity.currency" /></p>
        <p>Suitable for {{ activity.ageCategory }}</p>
      </main>
      <footer>
        <button>Book</button>
      </footer>
    </article>
  `,
  styles: [],
  providers: [DetailFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DetailPage implements OnInit {
  @Input() slug: string | null = null;
  #detailFacade: DetailFacade = inject(DetailFacade);
  getActivity = this.#detailFacade.getActivityState;
  description = computed(() => this.#detailFacade.getDescription(this.getActivity.result()));

  ngOnInit(): void {
    if (this.slug) {
      this.#detailFacade.getActivity(this.slug);
    }
  }
}
