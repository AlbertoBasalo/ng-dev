import { Injectable, inject } from '@angular/core';
import { ActivitiesService } from 'src/app/shared/data/activities.service';
import { Activity } from 'src/app/shared/domain/models/activity.interface';
import {
  getNewId,
  getSlug,
} from 'src/app/shared/domain/utils/identifier.functions';
import { GlobalStore } from 'src/app/shared/state/global.store';

@Injectable()
export class NewActivityFacade {
  #activitiesService = inject(ActivitiesService);
  #globalStore = inject(GlobalStore);
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
