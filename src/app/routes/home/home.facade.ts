import { Injectable, inject } from '@angular/core';
import { ActivitiesService } from '../../shared/data/activities.service';
import { Activity } from '../../shared/domain/models/activity.interface';
import { CommandStore } from '../../shared/state/command.store';

@Injectable()
export class HomeFacade {
  #activitiesService = inject(ActivitiesService);
  getActivitiesStore = new CommandStore<Activity[]>([]);

  getActivities(): void {
    const command$ = this.#activitiesService.getByState('published');
    this.getActivitiesStore.execute(command$);
  }
}
