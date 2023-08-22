import { Injectable, inject } from '@angular/core';
import { ActivitiesService } from '../../shared/data/activities.service';
import {
  Activity,
  DEFAULT_ACTIVITY,
} from '../../shared/domain/models/activity.interface';
import { CommandState } from '../../shared/state/command.state';
import { GlobalState } from '../../shared/state/global.state';

@Injectable()
export class MyActivitiesFacade {
  #activitiesService = inject(ActivitiesService);
  #globalState = inject(GlobalState);
  getMyActivitiesState = new CommandState<Activity[]>([]);
  putActivityState = new CommandState<Activity>(DEFAULT_ACTIVITY);

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
