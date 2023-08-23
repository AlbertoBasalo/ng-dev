import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Activity } from 'src/app/shared/domain/models/activity.interface';
import { CommandStore } from 'src/app/shared/state/command.store';
import { ListComponent } from '../../shared/ui/list.component';
import { LoadingComponent } from '../../shared/ui/loading.component';
import { ActivityItemComponent } from './activity-item.component';
import { HomeFacade } from './home.facade';
@Component({
  selector: 'lab-home',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    ListComponent,
    ActivityItemComponent,
  ],
  template: `
    <lab-loading *ngIf="getActivitiesStore.isWorking()" />
    <lab-list
      *ngIf="getActivitiesStore.isCompleted()"
      [items]="getActivitiesStore.result()"
      [itemTemplate]="activityItem"
      caption="Published activities" />
    <ng-template #activityItem let-activity>
      <lab-activity-item [activity]="activity" />
    </ng-template>
  `,
  styles: [],
  providers: [HomeFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  #homeFacade: HomeFacade = inject(HomeFacade);
  getActivitiesStore: CommandStore<Activity[]> =
    this.#homeFacade.getActivitiesStore;

  ngOnInit() {
    this.#homeFacade.getActivities();
  }
}
