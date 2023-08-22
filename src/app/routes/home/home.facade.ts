import { Injectable, inject } from '@angular/core';
import { ActivitiesService } from 'src/app/shared/data/activities.service';
import { Activity } from 'src/app/shared/domain/models/activity.interface';
import { CommandState } from 'src/app/shared/state/command.state';

@Injectable()
export class HomeFacade {
  #activitiesService = inject(ActivitiesService);
  getActivitiesStore = new CommandState<Activity[]>([]);

  getActivities(): void {
    const command$ = this.#activitiesService.getByState('published');
    this.getActivitiesStore.execute(command$);
  }
}
