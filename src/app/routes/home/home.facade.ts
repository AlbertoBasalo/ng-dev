import { Injectable, inject } from '@angular/core';
import { ActivitiesService } from 'src/app/shared/activities.service';
import { CommandState } from 'src/app/shared/command.state';
import { Activity } from 'src/app/shared/models/activity.interface';

@Injectable()
export class HomeFacade {
  #activitiesService = inject(ActivitiesService);
  getActivitiesStore = new CommandState<Activity[]>([]);

  getActivities(): void {
    const command$ = this.#activitiesService.getByState('published');
    this.getActivitiesStore.execute(command$);
  }
}
