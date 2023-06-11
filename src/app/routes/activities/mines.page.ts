import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorDialog } from 'src/app/shared/error.dialog';
import { ListComponent } from 'src/app/shared/list.component';
import { LoadingComponent } from 'src/app/shared/loading.component';
import { ActivityItem } from './activity.item';
import { MinesFacade } from './mines.facade';

@Component({
  selector: 'lab-mines',
  standalone: true,
  imports: [
    CommonModule,
    ActivityItem,
    LoadingComponent,
    ErrorDialog,
    ListComponent,
  ],
  template: `
    My activities
    <lab-loading *ngIf="getMyActivitiesStore.isWorking()" />
    <lab-error
      *ngIf="getMyActivitiesStore.hasError()"
      [error]="getMyActivitiesStore.error()" />
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
  `,
  styles: [],
  providers: [MinesFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MinesPage {
  #minesFacade: MinesFacade = inject(MinesFacade);
  getMyActivitiesStore = this.#minesFacade.getMyActivitiesStore;
  constructor() {
    this.#minesFacade.getMyActivities();
  }
  onChangeState(activity: any, state: string) {
    activity.state = state;
    this.#minesFacade.putActivity(activity);
  }
}
