import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Activity } from 'src/app/core/activity.interface';
import { CommandStore } from 'src/app/core/command.store';

@Injectable()
export class HomeFacade {
  #http = inject(HttpClient);
  getActivitiesStore = new CommandStore<Activity[]>([]);

  getActivities(): void {
    const api = 'http://localhost:3000/activities';
    const url = `${api}?state=published`;
    const command$ = this.#http.get<Activity[]>(url);
    this.getActivitiesStore.execute(command$);
  }
}
