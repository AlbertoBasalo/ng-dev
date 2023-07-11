import { Injectable, inject } from '@angular/core';
import { CommandState } from 'src/app/shared/command.state';
import { GlobalStore } from 'src/app/shared/global.store';
import {
  Activity,
  DEFAULT_ACTIVITY,
} from 'src/app/shared/models/activity.interface';
import { ActivitiesService } from '../../shared/activities.service';

@Injectable()
export class MyActivitiesFacade {
  #activitiesService = inject(ActivitiesService);
  #globalStore = inject(GlobalStore);
  getMyActivitiesStore = new CommandState<Activity[]>([]);
  putActivityStore = new CommandState<Activity>(DEFAULT_ACTIVITY);

  getMyActivities(): void {
    const userId = this.#globalStore.userId();
    const command$ = this.#activitiesService.getByUserId(userId);
    this.getMyActivitiesStore.execute(command$);
  }

  putActivity(activity: Activity): void {
    const command$ = this.#activitiesService.putActivity(activity);
    this.putActivityStore.execute(command$);
  }
}
