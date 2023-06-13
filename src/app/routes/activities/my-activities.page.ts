import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListComponent } from 'src/app/shared/list.component';
import { LoadingComponent } from 'src/app/shared/loading.component';
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
    My activities
    <lab-loading *ngIf="getMyActivitiesStore.isWorking()" />
    <lab-list
      *ngIf="getMyActivitiesStore.isCompleted()"
      [items]="getMyActivitiesStore.result()"
      [itemTemplate]="activityItem"
      caption="Published activities" />
    <ng-template #activityItem let-activity>
      <lab-activity
        [activity]="activity"
        (changeState)="onChangeState(activity, $event)" />
    </ng-template>
    <a role="button" routerLink="/activities/new">Create a new Activity</a>
  `,
  styles: [],
  providers: [MyActivitiesFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MyActivitiesPage {
  #myActivitiesFacade: MyActivitiesFacade = inject(MyActivitiesFacade);
  getMyActivitiesStore = this.#myActivitiesFacade.getMyActivitiesStore;
  constructor() {
    this.#myActivitiesFacade.getMyActivities();
  }
  onChangeState(activity: any, state: string) {
    activity.state = state;
    this.#myActivitiesFacade.putActivity(activity);
  }
}
