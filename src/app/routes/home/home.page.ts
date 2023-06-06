import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorDialog } from 'src/app/shared/error.dialog';
import { ListComponent } from 'src/app/shared/list.component';
import { LoadingComponent } from 'src/app/shared/loading.component';
import { ActivityItem } from './activity.item';
import { HomeFacade } from './home.facade';
@Component({
  selector: 'lab-home',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorDialog, ListComponent, ActivityItem],
  template: `
    <lab-loading *ngIf="getActivities.isWorking()" />
    <lab-error *ngIf="getActivities.hasError()" [errorMessage]="getActivities.errorMessage()" />
    <lab-list
      *ngIf="getActivities.isCompleted()"
      [items]="getActivities.result() ?? []"
      [itemTemplate]="activityItem"
      caption="Published activities" />
    <ng-template #activityItem let-activity>
      <lab-activity [activity]="activity" />
    </ng-template>
  `,
  styles: [],
  providers: [HomeFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  #homeFacade: HomeFacade = inject(HomeFacade);
  getActivities = this.#homeFacade.getActivitiesState;

  constructor() {
    this.#homeFacade.getActivities();
  }
}
