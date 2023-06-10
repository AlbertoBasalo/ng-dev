import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Activity } from 'src/app/core/activity.interface';
import { CommandStore } from 'src/app/core/command.store';

@Injectable()
export class HomeFacade {
  #http = inject(HttpClient);
  getActivitiesState = new CommandStore<Activity[]>([]);

  getActivities(): void {
    const api = 'http://localhost:3000/activities';
    const publishedUrl = `${api}?state=published`;
    const command$ = this.#http.get<Activity[]>(publishedUrl);
    this.getActivitiesState.execute(command$);
  }
}
