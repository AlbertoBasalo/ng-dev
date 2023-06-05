import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { DetailFacade } from './detail.facade';

@Component({
  selector: 'lab-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article *ngIf="getActivity.result() as activity" [attr.name]="slug">
      <hgroup>
        <h1>{{ activity.title }}</h1>
        <p>
          at {{ activity.location }} ({{ activity.country }}) on
          {{ activity.date | date : 'dd-MMM-yyyy' }}
        </p>
      </hgroup>
      <p>
        <span [innerHtml]="description()"></span>
      </p>
      <p>Maximum capacity {{ activity.capacity }} places</p>
      <p>Minimum quorum {{ activity.quorum }} bookings</p>
      <p>Pricing {{ activity.price | currency : activity.currency }}</p>
      <p>Suitable for {{ activity.ageCategory }}</p>
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
  getActivity = this.#detailFacade.getActivitySignal;
  description = computed(() =>
    this.#detailFacade.getDescription(this.getActivity.result())
  );
  ngOnInit(): void {
    if (this.slug) {
      this.#detailFacade.getActivity(this.slug);
    }
  }
}
