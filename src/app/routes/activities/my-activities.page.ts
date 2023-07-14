import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListComponent } from 'src/app/shared/ui/list.component';
import { LoadingComponent } from 'src/app/shared/ui/loading.component';
import { ActivityItem } from './activity.item';
import { MyActivitiesFacade } from './my-activities.facade';

@Component({
  selector: 'lab-my-activities',
  standalone: true,
  imports: [
    CommonModule,
    ActivityItem,
    LoadingComponent,
    ListComponent,
    RouterLink,
  ],
  template: `
    <lab-loading *ngIf="isWorking()" />
    <lab-list
      *ngIf="isCompleted()"
      [items]="myActivities()"
      [itemTemplate]="activityItem"
      caption="Published activities" />
    <ng-template #activityItem let-activity>
      <lab-activity
        [activity]="activity"
        (changeState)="onChangeState(activity, $event)" />
    </ng-template>
    <a role="button" routerLink="/activities/new">Create a new Activity </a>
    <pre *ngIf="hasPersistedActivity()" id="feedback">
Activity status updated!
    </pre
    >
    <pre *ngIf="failedToPersistActivity()" id="error-feedback">
      Failed to update activity status!
    </pre
    >
  `,
  styles: [],
  providers: [MyActivitiesFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MyActivitiesPage {
  #facade: MyActivitiesFacade = inject(MyActivitiesFacade);
  isWorking = this.#facade.getMyActivitiesState.isWorking;
  isCompleted = this.#facade.getMyActivitiesState.isCompleted;
  myActivities = this.#facade.getMyActivitiesState.result;
  hasPersistedActivity = this.#facade.putActivityState.isCompleted;
  failedToPersistActivity = this.#facade.putActivityState.hasError;
  constructor() {
    this.#facade.getMyActivities();
  }

  onChangeState(activity: any, state: string) {
    activity.state = state;
    this.#facade.putActivity(activity);
  }
}
