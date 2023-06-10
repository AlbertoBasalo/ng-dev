import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Activity, DEFAULT_ACTIVITY } from 'src/app/core/activity.interface';
import { CommandStore } from 'src/app/core/command.store';
import { GlobalStore } from 'src/app/core/global.store';

@Injectable()
export class MinesFacade {
  #http = inject(HttpClient);
  #globalStore = inject(GlobalStore);
  getMyActivitiesState = new CommandStore<Activity[]>([]);
  putActivityState = new CommandStore<Activity>(DEFAULT_ACTIVITY);

  getMyActivities(): void {
    const userId = this.#globalStore.userId();
    const api = 'http://localhost:3000/activities/?userId=';
    const url = `${api}${userId}`;
    const command$ = this.#http.get<Activity[]>(url);
    this.getMyActivitiesState.execute(command$);
  }

  putActivity(activity: Activity): void {
    const url = `http://localhost:3000/activities/${activity.id}`;
    const command$ = this.#http.put<Activity>(url, activity);
    this.putActivityState.execute(command$);
  }
}
