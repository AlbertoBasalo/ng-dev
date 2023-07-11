import { Injectable, inject } from '@angular/core';
import { GlobalState } from 'src/app/shared/global.state';
import { getNewId, getSlug } from 'src/app/shared/identifier.functions';
import { Activity } from 'src/app/shared/models/activity.interface';
import { ActivitiesService } from '../../shared/activities.service';

@Injectable()
export class NewActivityFacade {
  #activitiesService = inject(ActivitiesService);
  #globalStore = inject(GlobalState);
  postActivity(activity: Omit<Activity, 'id' | 'slug' | 'userId' | 'state'>) {
    const userId = this.#globalStore.userId();
    const payload: Activity = {
      ...activity,
      userId,
      id: getNewId(),
      slug: getSlug(activity.title),
      state: 'draft',
    };
    return this.#activitiesService.postActivity(payload);
  }
}
