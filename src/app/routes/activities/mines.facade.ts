import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Activity, DEFAULT_ACTIVITY } from 'src/app/core/activity.interface';
import { CommandStore } from 'src/app/core/command.store';
import { GlobalStore } from 'src/app/core/global.store';

@Injectable()
export class MinesFacade {
  #http = inject(HttpClient);
  #globalStore = inject(GlobalStore);
  #api = 'http://localhost:3000/activities';
  getMyActivitiesStore = new CommandStore<Activity[]>([]);
  putActivityStore = new CommandStore<Activity>(DEFAULT_ACTIVITY);

  getMyActivities(): void {
    const userId = this.#globalStore.userId();
    const url = `${this.#api}/?userId=${userId}`;
    const command$ = this.#http.get<Activity[]>(url);
    this.getMyActivitiesStore.execute(command$);
  }

  putActivity(activity: Activity): void {
    const url = `${this.#api}/${activity.id}`;
    const command$ = this.#http.put<Activity>(url, activity);
    this.putActivityStore.execute(command$);
  }
}
