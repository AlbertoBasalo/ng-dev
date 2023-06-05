import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/shared/error/error.component';
import { ListComponent } from 'src/app/shared/list/list.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { HomeFacade } from './home.facade';
@Component({
  selector: 'lab-home',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    ErrorComponent,
    ListComponent,
    RouterModule,
    CurrencyPipe,
    DatePipe,
  ],
  template: `
    <lab-loading *ngIf="getActivitiesSignal.isWorking()" />
    <lab-error
      *ngIf="getActivitiesSignal.hasError()"
      [errorMessage]="getActivitiesSignal.errorMessage()"
    />
    <lab-list
      *ngIf="getActivitiesSignal.isCompleted()"
      [items]="getActivitiesSignal.result() ?? []"
      [itemTemplate]="activityItem"
      caption="Published activities"
    />
    <ng-template #activityItem let-activity>
      <div name="activity-item" class="grid one-two">
        <span name="title">
          <a [routerLink]="['/activities', activity.slug]">
            ➡️ {{ activity.title }}
          </a>
        </span>
        <span name="price" class="right-align">
          {{
            activity.price | currency : activity.currency : 'symbol' : '1.0-0'
          }}
        </span>
        <span class="right-align" class="right-align">
          <span name="date">{{ activity.date | date : 'dd-MMM-yyyy' }}</span>
        </span>
      </div>
    </ng-template>
  `,
  styles: [],
  providers: [HomeFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  #homeFacade: HomeFacade = inject(HomeFacade);
  getActivitiesSignal = this.#homeFacade.getActivitiesSignal;
  constructor() {
    this.#homeFacade.getActivities();
  }
}
