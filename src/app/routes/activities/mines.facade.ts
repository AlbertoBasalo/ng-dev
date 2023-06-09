import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CommandState } from 'src/app/core/command.state';
import { GlobalStore } from 'src/app/core/global.store';

@Injectable()
export class MinesFacade {
  #api = 'http://localhost:3000/activities/?userId=';
  #http = inject(HttpClient);
  #globalStore = inject(GlobalStore);
  getMyActivitiesState = new CommandState<any[]>();
  putActivityState = new CommandState<any>();

  getMyActivities(): void {
    const userId = this.#globalStore.userId();
    const url = `${this.#api}${userId}`;
    const command$ = this.#http.get<any[]>(url);
    this.getMyActivitiesState.execute(command$);
  }

  putActivity(activity: any): void {
    const url = `http://localhost:3000/activities/${activity.id}`;
    const command$ = this.#http.put(url, activity);
    this.putActivityState.execute(command$);
  }
}
