import { Injectable, inject } from '@angular/core';
import { ActivitiesService } from '../../shared/data/activities.service';
import {
  Activity,
  DEFAULT_ACTIVITY,
} from '../../shared/domain/models/activity.interface';
import { CommandStore } from '../../shared/state/command.store';
import { GlobalStore } from '../../shared/state/global.store';

@Injectable()
export class MyActivitiesFacade {
  #activitiesService = inject(ActivitiesService);
  #globalState = inject(GlobalStore);
  getMyActivitiesState = new CommandStore<Activity[]>([]);
  putActivityState = new CommandStore<Activity>(DEFAULT_ACTIVITY);

  getMyActivities(): void {
    const userId = this.#globalState.userId();
    const command$ = this.#activitiesService.getByUserId(userId);
    this.getMyActivitiesState.execute(command$);
  }

  putActivity(activity: Activity): void {
    const command$ = this.#activitiesService.putActivity(activity);
    this.putActivityState.execute(command$);
  }
}
