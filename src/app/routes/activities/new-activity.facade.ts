import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Activity } from 'src/app/core/activity.interface';
import { GlobalStore } from 'src/app/core/global.store';

@Injectable()
export class NewActivityFacade {
  #http = inject(HttpClient);
  #globalStore = inject(GlobalStore);
  postActivity(activity: Omit<Activity, 'id' | 'slug' | 'userId' | 'state'>) {
    const url = 'http://localhost:3000/activities';
    const userId = this.#globalStore.userId();
    const payload: Activity = {
      ...activity,
      userId,
      id: new Date().getTime(),
      slug: activity.title?.toLowerCase().replace(/\s/g, '-') || '',
      state: 'draft',
    };
    return this.#http.post(url, payload);
  }
}
