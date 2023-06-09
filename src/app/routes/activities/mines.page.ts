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
  imports: [CommonModule, ActivityItem, LoadingComponent, ErrorDialog, ListComponent],
  template: `
    My activities
    <lab-loading *ngIf="getMyActivities.isWorking()" />
    <lab-error *ngIf="getMyActivities.hasError()" [errorMessage]="getMyActivities.errorMessage()" />
    <lab-list
      *ngIf="getMyActivities.isCompleted()"
      [items]="getMyActivities.result() ?? []"
      [itemTemplate]="activityItem"
      caption="Published activities" />
    <ng-template #activityItem let-activity>
      <lab-activity [activity]="activity" (changeState)="onChangeState(activity, $event)" />
    </ng-template>
  `,
  styles: [],
  providers: [MinesFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MinesPage {
  #minesFacade: MinesFacade = inject(MinesFacade);
  getMyActivities = this.#minesFacade.getMyActivitiesState;
  constructor() {
    this.#minesFacade.getMyActivities();
  }
  onChangeState(activity: any, state: string) {
    activity.state = state;
    this.#minesFacade.putActivity(activity);
  }
}
