import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ListComponent } from 'src/app/shared/ui/list.component';
import { LoadingComponent } from 'src/app/shared/ui/loading.component';
import { ActivityItem } from './activity.item';
import { HomeFacade } from './home.facade';
@Component({
  selector: 'lab-home',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ListComponent, ActivityItem],
  template: `
    <lab-loading *ngIf="getActivitiesStore.isWorking()" />
    <lab-list
      *ngIf="getActivitiesStore.isCompleted()"
      [items]="getActivitiesStore.result()"
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
  getActivitiesStore = this.#homeFacade.getActivitiesStore;

  constructor() {
    this.#homeFacade.getActivities();
  }
}
